# Emotion Journal Statistics - Calculation Guide

## Overview

The emotion journal statistics are calculated by querying the `emotion_cards` table with SQL aggregation functions. Here's exactly how each metric is computed.

---

## 1. AVERAGE INTENSITY

### **What It Measures**
The average emotional intensity across all emotion cards (on a 1-10 scale).

### **SQL Query**
```sql
SELECT AVG(emotion_intensity) as avg_intensity
FROM emotion_cards
WHERE user_id = $1
```

### **How It Works**

| Card | Emotion | Intensity |
|------|---------|-----------|
| Card 1 | hurt | 7 |
| Card 2 | anxiety | 6 |
| Card 3 | joy | 7 |
| Card 4 | anxiety | 6 |

**Calculation:**
```
Average = (7 + 6 + 7 + 6) / 4
        = 26 / 4
        = 6.5
```

### **Database Result**
```javascript
{
  avg_intensity: 6.5  // This is a number (PostgreSQL AVG returns decimal)
}
```

### **Frontend Display**
```javascript
stats.averageIntensity.toFixed(1)  // Converts 6.5 to "6.5"
// Displays as: "6.5/10"

// With indicator:
stats.averageIntensity > 6 ? '⚠️ Higher intensity' : '✨ Steady'
// 6.5 > 6, so shows: "⚠️ Higher intensity"
```

---

## 2. TOP TAG (MOST COMMON TAG)

### **What It Measures**
The most frequently mentioned tag across all emotion cards.

### **SQL Query**
```sql
SELECT UNNEST(tags) as tag, COUNT(*) as count
FROM emotion_cards
WHERE user_id = $1
GROUP BY tag
ORDER BY count DESC
LIMIT 10
```

### **How It Works**

**Example Data in Database:**
```
Card 1: tags = ['self', 'future']
Card 2: tags = ['self', 'future', 'creative']
Card 3: tags = ['self']
Card 4: tags = ['self']
```

**Step 1: UNNEST tags (explode array into rows)**
```
Card 1: 'self'
Card 1: 'future'
Card 2: 'self'
Card 2: 'future'
Card 2: 'creative'
Card 3: 'self'
Card 4: 'self'
```

**Step 2: GROUP BY and COUNT**
```
self:      5 occurrences
future:    2 occurrences
creative:  1 occurrence
```

**Step 3: ORDER BY count DESC and LIMIT 1**
```
First result: { tag: 'self', count: 5 }
```

### **Backend Result**
```javascript
mostCommonTags = [
  { tag: 'self', count: 5 },
  { tag: 'future', count: 2 },
  { tag: 'creative', count: 1 }
]
```

### **Frontend Display**
```javascript
// Get the first (most common) tag
stats.mostCommonTags[0]?.tag    // 'self'
stats.mostCommonTags[0]?.count  // 5

// Display: "self" with subtitle "5x mentioned"
```

---

## 3. CATEGORY BREAKDOWN (BONUS)

### **What It Measures**
How many emotion cards are positive, negative, or mixed.

### **SQL Query**
```sql
-- Step 1: Count each emotion
SELECT primary_emotion, COUNT(*) as count
FROM emotion_cards
WHERE user_id = $1
GROUP BY primary_emotion

-- Step 2: Categorize in JavaScript
```

### **How It Works**

**Emotion Categorization:**
```javascript
const emotionCategory = {
  positive: ['joy', 'gratitude', 'pride', 'excitement', 'contentment', 'hope', 'relief', 'love'],
  mixed: ['bittersweet', 'nostalgic', 'conflicted', 'overwhelmed'],
  negative: [/* all others - anxiety, sadness, anger, etc. */]
}
```

**Example Calculation:**
```
Card 1: hurt       → negative
Card 2: anxiety    → negative
Card 3: joy        → positive
Card 4: anxiety    → negative

Breakdown:
- Positive: 1
- Negative: 3
- Mixed: 0
```

### **Frontend Display**
```javascript
// Show with colored dots
⚫ Positive: 1
🔴 Negative: 3
🟣 Mixed: 0
```

---

## Complete Example

### **User with 4 Cards**

#### Card Data in Database:
```sql
Card 1:
  primary_emotion: 'hurt'
  emotion_intensity: 7
  tags: ['self', 'future']

Card 2:
  primary_emotion: 'anxiety'
  emotion_intensity: 6
  tags: ['self', 'future', 'creative']

Card 3:
  primary_emotion: 'joy'
  emotion_intensity: 7
  tags: ['self']

Card 4:
  primary_emotion: 'anxiety'
  emotion_intensity: 6
  tags: ['self']
```

#### Calculated Statistics:

```
TOTAL CARDS:
  COUNT(*) = 4

AVERAGE INTENSITY:
  AVG(emotion_intensity) = (7+6+7+6)/4 = 6.5
  Display: "6.5/10" with "⚠️ Higher intensity"

TOP TAG:
  self:      4 mentions (most common)
  future:    2 mentions
  creative:  1 mention
  Display: "self" with "4x mentioned"

EMOTION BREAKDOWN:
  Positive (joy):      1
  Negative (hurt, anxiety×2): 3
  Mixed:               0
  Display: ⚫ Positive: 1 | 🔴 Negative: 3 | 🟣 Mixed: 0

CHARACTER USAGE:
  Sheep:   2 conversations
  Rabbit:  2 conversations
  Fox:     0 conversations
```

---

## Database Query Performance

### **Query Execution Order**

```
1. Overview Query
   ├─ COUNT(*) - Scans all emotion_cards
   └─ AVG(emotion_intensity) - Aggregates intensity values

2. Emotion Frequency Query
   ├─ GROUP BY primary_emotion - Groups by emotion
   └─ COUNT(*) - Counts cards per emotion

3. Tags Query
   ├─ UNNEST(tags) - Expands tag arrays
   ├─ GROUP BY tag - Groups by each tag
   ├─ COUNT(*) - Counts mentions
   └─ ORDER BY count DESC, LIMIT 10 - Gets top 10

4. Character Usage Query
   ├─ GROUP BY character_used - Groups by character
   └─ COUNT(*) - Counts usage

5. Trends Query (Optional)
   ├─ WHERE timestamp >= NOW() - INTERVAL '30 days'
   ├─ GROUP BY DATE(timestamp), primary_emotion
   └─ AVG(emotion_intensity) - Daily intensity trend
```

### **Time Complexity**
- **Average Intensity**: O(n) - single table scan with aggregation
- **Top Tag**: O(n log n) - scan + group by + order by
- **Category Breakdown**: O(n) - single scan with categorization
- **Total**: O(n log n) - dominated by sorting

For typical user data (< 500 cards), all queries complete in < 100ms.

---

## Frontend Type Safety

### **Type Conversion**

```typescript
// Backend returns:
interface StatsResponse {
  totalCards: number;              // Already number (parseInt)
  averageIntensity: number;        // Number (from parseFloat)
  mostCommonTags: Array<{
    tag: EmotionTag;              // String literal type
    count: number;                 // parseInt
  }>;
  categoryBreakdown: {
    positive: number;
    negative: number;
    mixed: number;
  };
}

// Frontend safely uses:
stats.averageIntensity.toFixed(1)           // ✓ Safe - it's a number
stats.mostCommonTags[0]?.tag                // ✓ Safe - with optional chaining
stats.categoryBreakdown?.positive || 0      // ✓ Safe - with fallback
```

---

## Practical Examples

### **Example 1: Calculate Your Own Average Intensity**

```sql
-- Get your average intensity
SELECT AVG(emotion_intensity) as avg_intensity
FROM emotion_cards
WHERE user_id = '365d0ef8-5e70-4b7e-828b-78a98d0e9cbe'

-- Result: 6.5
-- Meaning: On average, emotional intensity is at 65% of maximum
```

### **Example 2: Find Your Top 3 Tags**

```sql
SELECT UNNEST(tags) as tag, COUNT(*) as count
FROM emotion_cards
WHERE user_id = '365d0ef8-5e70-4b7e-828b-78a98d0e9cbe'
GROUP BY tag
ORDER BY count DESC
LIMIT 3

-- Results:
-- self:      4x
-- future:    2x
-- creative:  1x
```

### **Example 3: Get Emotion Distribution**

```sql
SELECT primary_emotion, COUNT(*) as count
FROM emotion_cards
WHERE user_id = '365d0ef8-5e70-4b7e-828b-78a98d0e9cbe'
GROUP BY primary_emotion
ORDER BY count DESC

-- Results:
-- anxiety:   2
-- hurt:      1
-- joy:       1
```

---

## Frontend Code

### **How Stats Are Displayed**

```typescript
// From EmotionJournal.tsx - Statistics Panel

// 1. Average Intensity with Indicator
<div>
  <div>Average Intensity</div>
  <div>{typeof stats.averageIntensity === 'number'
    ? stats.averageIntensity.toFixed(1)
    : '0.0'}/10</div>
  <div>
    {stats.totalCards > 0 && stats.averageIntensity > 6
      ? '⚠️ Higher intensity'  // When avg > 6
      : '✨ Steady'}            // When avg ≤ 6
  </div>
</div>

// 2. Top Tag with Count
<div>
  <div>Top Tag</div>
  <div>{stats.mostCommonTags && stats.mostCommonTags.length > 0
    ? stats.mostCommonTags[0].tag
    : 'N/A'}</div>
  {stats.mostCommonTags && stats.mostCommonTags[0] && (
    <div>{stats.mostCommonTags[0].count}x mentioned</div>
  )}
</div>

// 3. Emotion Breakdown
<div>
  <div>Breakdown</div>
  <div>⚫ Positive: {stats.categoryBreakdown?.positive || 0}</div>
  <div>🔴 Negative: {stats.categoryBreakdown?.negative || 0}</div>
  <div>🟣 Mixed: {stats.categoryBreakdown?.mixed || 0}</div>
</div>
```

---

## Summary

| Metric | Calculation | Formula | Range |
|--------|------------|---------|-------|
| **Average Intensity** | Mean of all emotion_intensity values | `SUM(intensity) / COUNT(cards)` | 1.0 - 10.0 |
| **Top Tag** | Most frequently mentioned tag | `MAX(COUNT(tag) GROUP BY tag)` | String or 'N/A' |
| **Category Breakdown** | Count of emotions in each category | `COUNT(*) GROUP BY category` | 0 - total_cards |
| **Emotion Frequency** | How often each emotion appears | `COUNT(*) GROUP BY emotion` | 0 - total_cards |

All calculations are **database-driven** for performance and consistency.

