# Emotion Journal Statistics - Quick Reference

## 📊 Average Intensity Calculation

### **Simple Example**
```
Your 4 emotion cards have intensities:
├─ Card 1: 7  (Hurt - very intense)
├─ Card 2: 6  (Anxiety - moderately intense)
├─ Card 3: 7  (Joy - very intense)
└─ Card 4: 6  (Anxiety - moderately intense)

Average = (7 + 6 + 7 + 6) ÷ 4 = 26 ÷ 4 = 6.5

Display: "6.5/10" ⚠️ Higher intensity
```

### **SQL Query**
```sql
SELECT AVG(emotion_intensity) as avg_intensity
FROM emotion_cards
WHERE user_id = ?
```

### **What It Means**
- **1-3**: Light emotional state 🟢 Calm
- **4-6**: Moderate emotional state 🟡 Balanced
- **7-10**: Intense emotional state 🔴 Higher intensity

---

## 🏷️ Top Tag Calculation

### **Simple Example**
```
Your 4 emotion cards have tags:
├─ Card 1: ['self', 'future']
├─ Card 2: ['self', 'future', 'creative']
├─ Card 3: ['self']
└─ Card 4: ['self']

Count each tag:
├─ self:      4 times ← MOST COMMON
├─ future:    2 times
└─ creative:  1 time

Display: "self" (4x mentioned)
```

### **SQL Query**
```sql
SELECT UNNEST(tags) as tag, COUNT(*) as count
FROM emotion_cards
WHERE user_id = ?
GROUP BY tag
ORDER BY count DESC
LIMIT 1  -- Get only the top one
```

### **What Tags Mean**
```
🏢 work         - Work-related stress/success
❤️ relationships - Relationship issues/joy
🏥 health       - Health concerns/improvements
👨‍👩‍👧 family      - Family dynamics
🔮 future       - Hopes/fears about future
🪞 self         - Personal growth/self-doubt
💰 money        - Financial worries/wins
👥 social       - Social situations
🎨 creative     - Creative pursuits
📚 academic     - School/learning
```

---

## 📈 Category Breakdown Calculation

### **Simple Example**
```
Emotion Categorization:
├─ Hurt       → Negative emotion
├─ Anxiety    → Negative emotion (appears 2x)
├─ Joy        → Positive emotion
└─ (no mixed emotions in this example)

Breakdown:
├─ Positive: 1   (joy)
├─ Negative: 3   (hurt + anxiety + anxiety)
└─ Mixed:    0

Display: ⚫ Positive: 1 | 🔴 Negative: 3 | 🟣 Mixed: 0
```

### **Emotion Categories**

**Positive Emotions** 🟢
```
joy, gratitude, pride, excitement, contentment, hope, relief, love
```

**Negative Emotions** 🔴
```
anxiety, sadness, anger, loneliness, exhaustion, stress, hurt, fear, frustration, disappointment, guilt, shame
```

**Mixed Emotions** 🟣
```
bittersweet, nostalgic, conflicted, overwhelmed
```

---

## 📋 All Statistics at a Glance

### **Your Stats Dashboard**

```
┌─────────────────────────────────────────────────┐
│         EMOTION JOURNAL STATISTICS               │
├─────────────────────────────────────────────────┤
│                                                   │
│  Total Cards              Average Intensity      │
│  ┌──────────┐            ┌──────────────┐       │
│  │    4     │            │    6.5/10    │       │
│  └──────────┘            │ ⚠️ Higher    │       │
│                          └──────────────┘       │
│                                                   │
│  Top Tag                  Breakdown              │
│  ┌──────────┐            ┌──────────────┐       │
│  │  self    │            │ ⚫ +: 1       │       │
│  │ 4x       │            │ 🔴 -: 3      │       │
│  └──────────┘            │ 🟣 ~: 0      │       │
│                          └──────────────┘       │
│                                                   │
└─────────────────────────────────────────────────┘
```

---

## 🔄 How Stats Update

### **When Stats Are Calculated**

```
1. User clicks "Statistics" button
   ↓
2. Frontend calls: emotionService.getStats()
   ↓
3. Backend runs SQL queries (4 total):
   ├─ AVG(emotion_intensity) ← Average Intensity
   ├─ UNNEST(tags), GROUP BY, COUNT ← Top Tag
   ├─ GROUP BY primary_emotion ← Category Breakdown
   └─ GROUP BY character_used ← Character Usage
   ↓
4. Results returned to frontend
   ↓
5. Frontend displays with:
   ├─ Type-safe conversions
   ├─ Error handling
   ├─ Proper formatting (.toFixed(1))
   └─ Theme colors
```

### **Stats Load Once on Mount**

```javascript
// Stats are loaded ONE TIME when journal opens
useEffect(() => {
  loadStats()  // Fetch once
}, [])  // Empty dependency - runs only on mount
```

This means stats show **overall patterns**, not filtered data.

---

## 🧮 Real Database Example

### **Your Actual Data**

```
User: gdd031213@gmail.com (4 cards)

Card 1: hurt, intensity=7, tags=['self','future']
Card 2: anxiety, intensity=6, tags=['self','future','creative']
Card 3: joy, intensity=7, tags=['self']
Card 4: anxiety, intensity=6, tags=['self']
```

### **Calculated Results**

```
Total Cards:        4
Average Intensity:  6.5/10  ← (7+6+7+6)÷4
Top Tag:            self    ← mentioned 4x
Emotion Breakdown:
  - Positive:       1 (joy)
  - Negative:       3 (hurt, anxiety×2)
  - Mixed:          0
Character Breakdown:
  - Sheep:          2
  - Rabbit:         2
  - Fox:            0
```

---

## 💡 Tips for Reading Stats

### **Average Intensity Guide**

```
6.5/10 = 65% emotional intensity

Interpretation:
  └─ You're experiencing moderately-to-high emotional intensity
  └─ Above average suggests underlying concerns
  └─ Use this to track emotional trends over time
```

### **Top Tag Guide**

```
"self" mentioned 4 times

Interpretation:
  └─ Self-related concerns dominate your emotions
  └─ Could mean: personal growth, self-doubt, identity, boundaries
  └─ Consider: What aspects of "self" are most challenging?
```

### **Category Breakdown Guide**

```
3 Negative : 1 Positive : 0 Mixed

Interpretation:
  └─ 75% of emotions recorded are challenging
  └─ 25% are positive/good experiences
  └─ Consider: Do you want to balance this more?
  └─ Reminder: You're processing emotions, which is healthy!
```

---

## 🔍 Troubleshooting

### **"No emotion cards yet"**
- You haven't created any emotion cards
- Solution: Have a conversation → Click "Done Talking" → Create emotion card

### **Stats showing 0s**
- Database query returned empty result
- Solution: Click "Try again" button to retry
- Or: Wait a moment and refresh the page

### **Stats not updating**
- Stats load once on component mount
- Filter changes don't affect stats (by design)
- Solution: Refresh the page to reload stats
- Or: Navigate away and back to journal

### **Wrong tag count**
- Tags can appear multiple times across cards
- Solution: Use the tag filter to see all cards with that tag

---

## 📚 Full Guide

For detailed explanation with examples, see: `STATS_CALCULATION_GUIDE.md`

For code implementation, check:
- Backend: `Backend/src/models/EmotionCard.ts` (getStats method)
- Frontend: `Chatbot/src/components/EmotionJournal.tsx` (Statistics Panel)

