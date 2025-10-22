# Landing Page Compliance Guide
## Inner Voice AI Companion App

**Last Updated:** 2025-01-10
**Purpose:** Ensure landing page clearly communicates app limitations, legal compliance, and GDPR requirements

---

## 🎯 Core Mission Statement

**"A private AI companion for when you're distressed and don't want friends involved."**

Inner Voice serves people who:
- Need emotional support but don't want to burden friends or family
- Want privacy without judgment or social consequences
- Need help at times when no one is available (late night, early morning)
- Prefer to process emotions privately before talking to real people
- Value complete confidentiality and control over their emotional wellbeing

This core mission must be reflected throughout your landing page while maintaining legal compliance.

---

## 🚨 Critical Legal Disclaimers

### 1. **NOT A THERAPY TOOL - Required Disclosure**

Your landing page MUST include prominent disclaimers that Inner Voice is NOT a replacement for professional mental health services.

#### **Hero Section Disclaimer** (Above the fold)
```html
<!-- Place immediately visible on homepage -->
<div class="disclaimer-banner">
  <p>
    <strong>Important:</strong> Inner Voice is an AI companion for emotional support
    and self-reflection. It is NOT a substitute for professional therapy, medical
    advice, or crisis intervention.
  </p>
</div>
```

**Recommended Text:**
```
Inner Voice is a private AI companion for when you're distressed and don't want
to involve friends or family. We provide emotional support, encouragement, and
self-reflection tools in a completely private, judgment-free space.

IMPORTANT: Inner Voice is NOT a substitute for professional mental health care,
medical treatment, or emergency services. We are a supportive companion, not a
licensed therapist.

If you are experiencing a mental health crisis, please contact:
- National Suicide Prevention Lifeline: 988 (US)
- Crisis Text Line: Text HOME to 741741
- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/
- China Mental Health Crisis Hotline: 400-161-9995

Inner Voice is for emotional support when you need someone to talk to, but
professional help is always recommended for serious mental health concerns.
```

#### **Features Section Disclaimer**
When describing AI features, always use language like:
- ✅ "AI companion for daily emotional support"
- ✅ "Self-reflection and coping strategy suggestions"
- ✅ "Evidence-based wellness techniques (CBT, mindfulness)"
- ❌ ~~"AI therapist"~~
- ❌ ~~"Mental health treatment"~~
- ❌ ~~"Diagnoses mental health conditions"~~
- ❌ ~~"Clinical therapy"~~

---

## 📋 GDPR Compliance Requirements

### 2. **Privacy Policy - Mandatory Content**

Your privacy policy MUST include these sections:

#### **A. Data Controller Information**
```
Data Controller: [Your Company Name]
Contact Email: privacy@yourapp.com
Address: [Your registered business address]
EU Representative: [If you have EU users and are outside EU]
```

#### **B. Legal Basis for Processing**
Under GDPR Article 6, state your legal basis:

```
We process your personal data based on:
1. Consent (Article 6(1)(a)) - for optional features like mood tracking
2. Contract Performance (Article 6(1)(b)) - to provide app services
3. Legitimate Interests (Article 6(1)(f)) - for service improvement and security

Special Category Data (Article 9 - Health Data):
We process mental health-related information (mood states, conversation topics)
based on your EXPLICIT CONSENT only. You can withdraw consent at any time.
```

#### **C. Data We Collect**

**Personal Data:**
- Email address (for account creation)
- Username
- Google OAuth data (if using Google login): name, email, profile picture
- IP address (for security and rate limiting)
- Device information (for technical support)

**Conversation Data (Special Category - Health Data):**
- Chat messages with AI characters
- Detected emotional states and mood trends
- Session timestamps and duration
- Character preferences

**Important Privacy Commitment:**
```
🔒 PRIVACY-FIRST DESIGN:
- Conversation content is stored in temporary memory (Redis) for 1 hour only
- Chat history is NOT permanently stored in our database
- We do NOT sell, rent, or share your conversation data with third parties
- All data is encrypted in transit (TLS/SSL) and at rest
```

#### **D. Data Retention Periods**

| Data Type | Retention Period | Purpose |
|-----------|-----------------|---------|
| Account Information | Until account deletion | Service provision |
| Conversation History | 1 hour (Redis TTL) | Real-time context only |
| Usage Analytics | 90 days | Service improvement |
| Mood Tracking Data | User-controlled deletion | Personal insights |
| Authentication Tokens | 24 hours (access), 30 days (refresh) | Security |
| Logs (error, security) | 30 days | Technical support |

#### **E. User Rights (GDPR Articles 15-22)**

Your landing page must inform users of their rights:

```
YOUR PRIVACY RIGHTS:

✅ Right to Access (Article 15)
   Request a copy of all your personal data we hold

✅ Right to Rectification (Article 16)
   Correct inaccurate personal information

✅ Right to Erasure / "Right to be Forgotten" (Article 17)
   Delete your account and all associated data

✅ Right to Restrict Processing (Article 18)
   Limit how we use your data

✅ Right to Data Portability (Article 20)
   Receive your data in a machine-readable format (JSON/CSV)

✅ Right to Object (Article 21)
   Object to processing based on legitimate interests

✅ Right to Withdraw Consent (Article 7)
   Withdraw consent for mood tracking or analytics at any time

To exercise your rights, email: privacy@yourapp.com
We will respond within 30 days (GDPR requirement)
```

---

### 3. **Cookie Consent Banner (GDPR Article 7)**

#### **Cookie Banner Example**
```html
<!-- Must appear BEFORE cookies are set -->
<div id="cookie-consent-banner">
  <h3>Cookie Consent</h3>
  <p>
    We use cookies to improve your experience and keep you logged in.
    We use both essential and optional cookies.
  </p>

  <div class="cookie-categories">
    <label>
      <input type="checkbox" checked disabled>
      Essential Cookies (Required for login and security)
    </label>

    <label>
      <input type="checkbox" id="analytics-cookies">
      Analytics Cookies (Help us improve the app)
    </label>
  </div>

  <button id="accept-all">Accept All</button>
  <button id="accept-essential">Essential Only</button>
  <a href="/cookie-policy">Learn More</a>
</div>
```

#### **Cookie Policy Content**

| Cookie Name | Purpose | Type | Duration |
|-------------|---------|------|----------|
| `auth_token` | Keep you logged in | Essential | 24 hours |
| `refresh_token` | Renew your session | Essential | 30 days |
| `session_id` | Track conversation sessions | Essential | Session |
| `character_pref` | Remember your preferred character | Essential | 1 year |
| `theme_pref` | Remember your theme choice | Essential | 1 year |
| `_ga`, `_gid` | Google Analytics (if used) | Analytics | 2 years |

---

### 4. **Age Restrictions (GDPR Article 8 & COPPA)**

#### **Minimum Age Requirement**

```html
<!-- Registration page -->
<div class="age-restriction">
  <h3>Age Requirement</h3>
  <p>
    You must be at least 16 years old to use Inner Voice (18 in some countries).

    If you are under 16/18, please ask a parent or guardian to create an
    account on your behalf.
  </p>

  <label>
    <input type="checkbox" required>
    I confirm that I am at least 16 years old (or 18 if required in my country)
  </label>
</div>
```

**EU Age Requirements:**
- Default: 16 years old
- Countries requiring 18: Austria (14), Bulgaria (14), Czech Republic (15), France (15), etc.
- Use geolocation or user selection to enforce correct age

**US COPPA Compliance:**
- Prohibit users under 13
- Require parental consent for users 13-17

---

### 5. **Terms of Service - Key Sections**

#### **A. Service Limitations**

```
WHAT INNER VOICE IS:
✅ A private AI companion for when you're distressed and don't want friends involved
✅ A safe space to express feelings without judgment or social consequences
✅ Available 24/7 when you need support but prefer not to burden others
✅ A tool for practicing coping strategies and self-reflection in private
✅ Evidence-based wellness techniques (CBT, breathing exercises, mindfulness)
✅ A way to process emotions before (or instead of) talking to real people

WHAT INNER VOICE IS NOT:
❌ A licensed therapist, counselor, or mental health professional
❌ A medical device or diagnostic tool
❌ A replacement for professional mental health care
❌ A replacement for human friendship or real relationships
❌ An emergency crisis intervention service
❌ Capable of providing medical advice or diagnoses

CORE PHILOSOPHY:
💡 Inner Voice helps you when you need emotional support but prefer privacy
💡 We provide a judgment-free space without the social complexities of real relationships
💡 Our goal is to help you process emotions and develop coping skills
💡 We encourage professional help for serious concerns and real human connection for long-term wellbeing

LIMITATIONS OF AI:
⚠️ AI responses are generated by algorithms and may not always be accurate
⚠️ AI cannot understand context as well as a human therapist or friend
⚠️ AI cannot provide the genuine human connection you may ultimately need
⚠️ AI cannot handle emergencies or crisis situations
⚠️ AI does not have professional judgment or clinical training
```

#### **B. Crisis Protocol**

```
CRISIS SITUATIONS:

If you are experiencing suicidal thoughts, self-harm urges, or a mental
health emergency, IMMEDIATELY contact:

🆘 Emergency Services: 911 (US), 112 (EU), 999 (UK)
🆘 Suicide Prevention Hotline: 988 (US), 116 123 (UK - Samaritans)
🆘 Crisis Text Line: Text HOME to 741741
🆘 China Mental Health Hotline: 400-161-9995

Inner Voice is NOT equipped to handle crisis situations and will direct
you to appropriate resources.
```

#### **C. User Responsibilities**

```
BY USING INNER VOICE, YOU AGREE TO:

1. Use the app for private emotional support when you prefer not to involve friends
2. Understand that Inner Voice is a COMPANION, not a therapist or replacement for human connection
3. NOT rely on the app as a substitute for professional mental health care
4. Seek professional help for serious mental health concerns or crises
5. NOT use the app for medical emergencies
6. Recognize that while we provide privacy, real human relationships remain important
7. NOT share content that violates our community guidelines
8. NOT attempt to manipulate or abuse the AI systems
9. Understand that AI responses are supportive guidance, not professional advice
10. Use Inner Voice as a tool to process emotions, not as a replacement for all human interaction
```

#### **D. Liability Limitations**

```
DISCLAIMER OF WARRANTIES:

Inner Voice is provided "AS IS" without warranties of any kind. We do not
guarantee that:
- AI responses will be accurate, helpful, or appropriate
- The app will be available without interruption
- Use of the app will improve your mental health
- The app is suitable for your specific situation

LIMITATION OF LIABILITY:

To the maximum extent permitted by law, [Your Company] shall not be liable for:
- Any harm resulting from use or reliance on AI responses
- Decisions made based on app interactions
- Technical failures or data loss
- Missed crisis interventions

Your use of professional mental health services remains your responsibility.
```

---

## 6. **Data Processing Agreement (GDPR Article 28)**

If you use third-party services (OpenAI, Google Cloud, AWS), you MUST have Data Processing Agreements (DPAs):

### **Third-Party Processors**

| Processor | Purpose | Data Shared | DPA Required? | Location |
|-----------|---------|-------------|---------------|----------|
| OpenAI | Generate AI responses | User messages, conversation context | ✅ YES | USA (Privacy Shield successor) |
| Google Cloud / Firebase | Hosting, authentication | Email, auth tokens | ✅ YES | EU/USA |
| Redis Cloud | Temporary conversation storage | Chat history (1hr TTL) | ✅ YES | EU/USA |
| PostgreSQL (AWS RDS) | User accounts, preferences | Account data, settings | ✅ YES | EU region |

**Action Required:**
1. ✅ Sign DPA with each processor
2. ✅ Ensure Standard Contractual Clauses (SCCs) for non-EU transfers
3. ✅ List all processors in your Privacy Policy
4. ✅ Conduct Data Protection Impact Assessment (DPIA) for health data

---

## 7. **Consent Management**

### **Explicit Consent Required For:**

#### **A. Health Data Processing**
```html
<!-- During onboarding -->
<div class="consent-form">
  <h3>Data Processing Consent</h3>

  <label>
    <input type="checkbox" name="conversation_processing" required>
    I consent to Inner Voice processing my conversations with AI characters
    to provide emotional support. This includes analyzing emotional states
    and suggesting coping strategies. (Required)
  </label>

  <label>
    <input type="checkbox" name="mood_tracking">
    I consent to mood tracking and trend analysis to show my progress over time.
    (Optional - can be disabled in settings)
  </label>

  <label>
    <input type="checkbox" name="analytics">
    I consent to anonymized usage analytics to help improve the app.
    (Optional)
  </label>

  <p class="consent-notice">
    You can withdraw your consent at any time in Settings > Privacy.
    Withdrawing consent will delete associated data within 30 days.
  </p>
</div>
```

#### **B. Consent Withdrawal**
Provide easy consent withdrawal:

```
Settings > Privacy > Data Processing Consent

[ ] Mood Tracking - Currently: ENABLED
    Disable mood tracking and delete all mood history

[ ] Usage Analytics - Currently: ENABLED
    Disable analytics and anonymize past data

[Button: Save Changes]

Note: Essential conversation processing cannot be disabled as it's required
for the app to function. To stop all processing, delete your account.
```

---

## 8. **International Data Transfers (GDPR Chapter V)**

### **If You Transfer Data Outside EU:**

```
INTERNATIONAL DATA TRANSFERS:

Your data may be transferred to and processed in countries outside the
European Economic Area (EEA), including the United States.

We ensure adequate protection through:
✅ Standard Contractual Clauses (SCCs) approved by EU Commission
✅ Data Processing Agreements with all processors
✅ Encryption in transit and at rest
✅ Privacy Shield successor frameworks (where applicable)

Countries we transfer data to:
- United States (OpenAI API, AWS/Google Cloud servers)
- [List other countries]

You have the right to request details of our safeguards: privacy@yourapp.com
```

---

## 9. **Landing Page Structure Checklist**

### **✅ Must-Have Sections:**

1. **Header**
   - [ ] App name and logo
   - [ ] Clear tagline: "Private AI Companion for When You Don't Want Friends Involved" (NOT "AI Therapist")
   - [ ] Prominent disclaimer banner

2. **Hero Section**
   - [ ] Core mission: "For when you're distressed and need someone, but not your friends"
   - [ ] What the app IS (private companion, emotional support, judgment-free space)
   - [ ] What the app IS NOT (therapy, medical device, replacement for friends/professionals)
   - [ ] Key benefits: Available 24/7, completely private, no social pressure
   - [ ] Crisis resources visible
   - [ ] CTA: "Get Private Support Now" with age check

3. **Use Case Section (NEW - Mission-Critical)**
   - [ ] "When You Need Support But..."
     - [ ] "Don't want to burden your friends"
     - [ ] "It's 3 AM and no one's awake"
     - [ ] "Want to process privately first"
     - [ ] "Need judgment-free guidance"
     - [ ] "Prefer no social consequences"

4. **Privacy & Confidentiality** (Emphasized)
   - [ ] "Completely Private - No One Will Know You Used This"
   - [ ] "Your conversations disappear after 1 hour - not stored permanently"
   - [ ] "We never sell or share your emotional data"
   - [ ] "No social media integration - keep this separate from your life"
   - [ ] GDPR compliance badge
   - [ ] Encryption icons
   - [ ] Link to full Privacy Policy

5. **Features**
   - [ ] Use safe language: "emotional support", "coping strategies", "wellness tools", "private companion"
   - [ ] Avoid: "treatment", "therapy", "diagnosis", "cure", "replace friends"
   - [ ] Mention evidence-based techniques (CBT, mindfulness) as educational only
   - [ ] Emphasize: "Process emotions privately before talking to real people"

6. **Footer**
   - [ ] Links: Privacy Policy, Terms of Service, Cookie Policy
   - [ ] Contact: support@yourapp.com, privacy@yourapp.com
   - [ ] Age restriction notice
   - [ ] Crisis resources
   - [ ] Reminder: "Inner Voice is a private companion, not a replacement for professional care or human connection"

---

## 10. **Recommended Legal Language**

### **Safe Marketing Copy:**

✅ **GOOD Examples (Core Mission-Aligned):**
```
"A private AI companion for when you're distressed and don't want friends involved"
"Talk freely without fear of judgment or burdening others"
"24/7 emotional support when you need someone, but not anyone you know"
"Your private space to process emotions before (or instead of) talking to real people"
"Available at 3 AM when no one else is - completely confidential"
"Express yourself freely without social consequences or awkward explanations"
"The support you need, the privacy you deserve"
"Sometimes you need to talk, but not to your friends - we're here for that"
"Practice evidence-based coping strategies in complete privacy"
"A judgment-free companion when you can't (or don't want to) talk to friends"
```

✅ **Additional GOOD Examples:**
```
"Your AI companion for daily emotional support and self-reflection"
"A safe space to express feelings and explore wellness techniques"
"Get 24/7 emotional support from AI characters trained in empathy"
"Complement your mental health journey with AI-powered self-care tools"
```

❌ **AVOID These:**
```
"AI therapy at your fingertips"
"Replace your therapist with AI"
"Get diagnosed and treated by AI"
"Cure anxiety and depression with our app"
"Professional mental health treatment"
"Replace your friends with AI"
"Never need human connection again"
```

### **Safe Feature Descriptions:**

| Feature | ✅ Safe Language | ❌ Risky Language |
|---------|-----------------|-------------------|
| AI Chat | "Compassionate AI companion for emotional support" | "AI therapist provides treatment" |
| Mood Tracking | "Track your emotional patterns over time" | "Diagnose mood disorders" |
| CBT Techniques | "Learn evidence-based coping strategies" | "Receive cognitive behavioral therapy" |
| Crisis Protocol | "Directs to professional crisis resources" | "Handles mental health emergencies" |
| Character Personas | "Distinct AI personalities for different needs" | "Licensed AI counselors" |

---

## 11. **Ongoing Compliance Tasks**

### **Monthly:**
- [ ] Review user complaints for safety issues
- [ ] Update crisis resource phone numbers
- [ ] Check third-party DPA renewals

### **Quarterly:**
- [ ] Audit data retention (ensure Redis TTL working)
- [ ] Review Privacy Policy for accuracy
- [ ] Test GDPR data export functionality
- [ ] Review consent withdrawal process

### **Annually:**
- [ ] Conduct Data Protection Impact Assessment (DPIA)
- [ ] Review and update Terms of Service
- [ ] Audit third-party processors
- [ ] Train team on GDPR compliance

---

## 12. **Required Legal Pages**

### **A. Privacy Policy** (GDPR compliant)
- Data controller information
- Legal basis for processing
- Data collected, purposes, retention
- User rights (access, erasure, portability)
- Third-party processors
- International transfers
- Contact information

### **B. Terms of Service**
- Service description and limitations
- User responsibilities
- Prohibited uses
- Liability disclaimers
- Termination policy
- Governing law and jurisdiction

### **C. Cookie Policy**
- Types of cookies used
- Purpose of each cookie
- How to manage cookies
- Third-party cookies (if any)

### **D. Community Guidelines** (if you add social features)
- Acceptable use
- Prohibited content
- Reporting process
- Moderation policies

---

## 13. **Technical Implementation**

### **Backend Requirements:**

```typescript
// User consent tracking
interface UserConsent {
  user_id: string;
  conversation_processing: {
    granted: boolean;
    timestamp: string;
    ip_address: string; // Proof of consent
  };
  mood_tracking: {
    granted: boolean;
    timestamp: string;
  };
  analytics: {
    granted: boolean;
    timestamp: string;
  };
  consent_version: string; // Track policy version
}

// GDPR data export endpoint
app.get('/api/user/gdpr-export', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  const userData = {
    account: await UserModel.getProfile(userId),
    preferences: await UserModel.getPreferences(userId),
    usage_history: await UsageModel.getUserHistory(userId),
    mood_data: await MoodModel.getHistory(userId), // if implemented
    consents: await ConsentModel.getHistory(userId),
    // NOTE: Conversation content NOT included (not stored)
  };

  res.json({
    export_date: new Date().toISOString(),
    data_format: 'JSON',
    user_id: userId,
    data: userData
  });
});

// GDPR account deletion endpoint
app.delete('/api/user/account', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  // Delete all user data
  await UserModel.deleteUser(userId);
  await UsageModel.deleteUserData(userId);
  await MoodModel.deleteUserData(userId);
  await ConversationMemory.clearAllSessions(userId);

  res.json({
    success: true,
    message: 'Account and all data deleted permanently'
  });
});
```

---

## 14. **Crisis Resource Updates**

Keep crisis resources CURRENT and REGION-SPECIFIC:

### **United States:**
- 988 Suicide & Crisis Lifeline
- Crisis Text Line: Text HOME to 741741
- SAMHSA National Helpline: 1-800-662-4357

### **European Union:**
- 112 Emergency Services
- 116 123 Emotional Support (many countries)
- Country-specific hotlines: https://www.iasp.info/resources/Crisis_Centres/

### **United Kingdom:**
- 999 Emergency Services
- 116 123 Samaritans
- Text SHOUT to 85258 (Crisis Text Line)

### **China:**
- 400-161-9995 Mental Health Crisis Hotline
- Beijing Suicide Research and Prevention Center: 010-82951332

### **Australia:**
- 000 Emergency Services
- Lifeline: 13 11 14
- Beyond Blue: 1300 22 4636

**Update these quarterly or when notified of changes!**

---

## 15. **Legal Review Checklist Before Launch**

- [ ] Privacy Policy reviewed by legal counsel
- [ ] Terms of Service reviewed by legal counsel
- [ ] All disclaimers prominent and clear
- [ ] Age verification implemented
- [ ] Consent management system tested
- [ ] GDPR data export tested
- [ ] Account deletion tested (full data removal)
- [ ] Cookie banner compliant
- [ ] DPAs signed with all processors
- [ ] Crisis resources verified current
- [ ] No therapy/medical claims in marketing
- [ ] Liability limitations clearly stated
- [ ] Contact information accurate (privacy@, support@)

---

## 16. **Red Flags to AVOID**

🚩 **NEVER say:**
- "AI therapist"
- "Get therapy online"
- "Diagnose your mental health"
- "Treatment for depression/anxiety"
- "Replace your psychiatrist"
- "Clinical mental health care"
- "Licensed counseling"

🚩 **NEVER do:**
- Store conversation data permanently without explicit consent
- Share health data with third parties for advertising
- Make medical claims about AI effectiveness
- Guarantee mental health improvements
- Target children under minimum age
- Transfer EU data without SCCs

---

## 17. **Resources & Templates**

### **Useful Links:**
- GDPR Full Text: https://gdpr-info.eu/
- ICO (UK) Guide: https://ico.org.uk/for-organisations/guide-to-data-protection/
- IAPP Resources: https://iapp.org/
- Privacy Policy Generator: https://www.privacypolicies.com/
- Standard Contractual Clauses: https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en

### **Recommended Legal Services:**
- Termly.io (Privacy Policy Generator)
- Iubenda (Cookie Consent & Privacy)
- OneTrust (Enterprise Consent Management)
- TrustArc (Privacy Compliance Platform)

---

## ✅ Final Checklist

**Before updating your landing page:**

- [ ] All disclaimers about NOT being therapy are prominent
- [ ] Crisis resources visible on every page
- [ ] Privacy Policy is GDPR compliant
- [ ] Terms of Service clearly state limitations
- [ ] Cookie consent banner implemented
- [ ] Age restrictions enforced
- [ ] User consent tracking implemented
- [ ] GDPR rights accessible (export, delete)
- [ ] Marketing language avoids medical claims
- [ ] Legal counsel has reviewed (HIGHLY RECOMMENDED)

---

**Document Version:** 1.0
**Next Review:** [3 months from today]
**Owner:** [Your Name/Legal Team]

---

**DISCLAIMER:** This guide provides general information and is NOT legal advice.
Consult with a qualified attorney specializing in privacy law, GDPR, and mental
health app regulations in your jurisdiction before launch.

**Recommended:** Hire a lawyer experienced in:
- GDPR compliance (EU)
- HIPAA compliance (US, if applicable)
- Mental health app regulations
- Terms of Service drafting
- Liability protection for AI products
