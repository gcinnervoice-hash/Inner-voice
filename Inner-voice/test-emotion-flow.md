# Emotion Card Troubleshooting Guide

## Prerequisites for Creating Emotion Cards

1. **Minimum Messages Required**: You need at least **2 user messages** in the conversation
   - The emotion analysis needs sufficient context to analyze your emotions
   - If you have < 2 user messages, you'll see an "Insufficient conversation" error

2. **Active Session ID**: Your conversation must have a sessionId
   - This is automatically created when you send your first message
   - Check the browser console for logs showing `Session ID updated: <uuid>`

3. **Backend Must Be Running**: Port 5000
   - Test: `curl http://localhost:5000/api/health`
   - Should return: `{"status":"healthy",...}`

## How to Test Emotion Card Creation

### Step 1: Open Browser DevTools
Press `F12` in your browser to open DevTools, go to the "Console" tab

### Step 2: Have a Conversation
Send at least 3-4 messages to one of the characters (Daisy, Luna, or Zara):
- Example: "I'm feeling stressed about work"
- Example: "There's so much to do and not enough time"
- Example: "I'm worried I'll disappoint people"

### Step 3: Click "Done Talking"
The button should appear in the sidebar after you've sent messages.

### Step 4: Watch for Errors
In the Console tab, look for:
- ✅ **Success**: `Emotion card created successfully`
- ❌ **Errors**: Any red error messages

## Common Errors and Solutions

### Error: "No active conversation to analyze"
**Problem**: No sessionId exists
**Solution**: Send at least 1 message in the chat first

### Error: "Insufficient conversation"
**Problem**: Less than 2 user messages in the conversation
**Solution**: Send at least 2-3 messages before creating a card

### Error: "No conversation found"
**Problem**: Session expired (1-hour TTL) or was cleared
**Solution**: Start a new conversation

### Error: "Failed to retrieve emotion cards"
**Problem**: Backend not running or database issue
**Solution**: Check backend status with `curl http://localhost:5000/api/health`

### Error: "Failed to create emotion card"
**Problem**: OpenAI API issue or database error
**Solution**: Check backend logs for specific error details

## Checking Backend Logs

1. Go to terminal where backend is running
2. Look for these log entries:
   - `Analyzing conversation for emotion card`
   - `Emotion card created successfully`
   - Or any `[error]` entries with details

## Manual API Test

Test the emotion API directly:

```bash
# First, send some chat messages to create a session
# Then test the analyze endpoint (replace SESSION_ID with actual ID):

curl -X POST http://localhost:5000/api/emotion/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "YOUR_SESSION_ID_HERE",
    "characterUsed": "sheep"
  }'
```

## Expected Flow

1. User sends messages → sessionId created → conversation saved to Redis
2. User clicks "Done Talking" → Emotion analysis triggered
3. Backend analyzes conversation with OpenAI
4. Emotion card created and saved to database
5. Conversation deleted from Redis (privacy)
6. Card displayed to user

## Database Check

Verify emotion cards are being saved:

```bash
cd Backend
node -e "
const pg = require('pg');
const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'inner_voice_db',
  user: 'test_user',
  password: 'test_user'
});
pool.query('SELECT COUNT(*) FROM emotion_cards').then(r => {
  console.log('Emotion cards in database:', r.rows[0].count);
  pool.end();
});
"
```

## Next Steps

1. Try creating an emotion card with at least 3 messages
2. Check the browser console for any error messages
3. Share the specific error message you see
4. I can help debug the exact issue!
