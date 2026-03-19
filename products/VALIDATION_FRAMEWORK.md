# Product Validation Framework

A systematic process for deciding whether to kill or keep each micro-SaaS product we ship.

## Decision Timeline

Every product gets **14 days** from launch to hit validation criteria. At day 14, we make a kill/keep decision.

| Day | Action |
|-----|--------|
| 0 | Launch MVP, start tracking metrics |
| 1-3 | Share with 10+ target users, collect initial feedback |
| 7 | Week 1 review: check metrics vs thresholds |
| 14 | Kill/keep decision |

## Success Metrics

### Tier 1: Must-Have (all required to KEEP)

| Metric | Threshold | How to Measure |
|--------|-----------|----------------|
| Unique visitors | 50+ in 14 days | Vercel Analytics |
| Return visitors | 10%+ return within 7 days | Vercel Analytics |
| Core action completion | 60%+ of visitors use the tool | Custom event tracking |

### Tier 2: Strong Signals (2 of 3 required to KEEP)

| Metric | Threshold | How to Measure |
|--------|-----------|----------------|
| Session duration | >30s average | Vercel Analytics |
| Organic search traffic | Any organic visits by day 14 | Vercel Analytics referrer data |
| Positive feedback | 3+ positive responses | Feedback widget |

### Tier 3: Growth Indicators (nice to have, not required)

| Metric | Signal |
|--------|--------|
| Social shares | Anyone tweets/shares the tool |
| Backlinks | External sites linking to us |
| Feature requests | Users asking for more |

## Kill/Keep Decision Matrix

```
ALL Tier 1 met + 2/3 Tier 2 met  →  KEEP (invest more)
ALL Tier 1 met + 1/3 Tier 2 met  →  KEEP (monitor 7 more days)
ANY Tier 1 missed                 →  KILL (archive, move on)
```

## What "KEEP" Means

1. Add to portfolio
2. Invest in SEO (meta tags, content pages, sitemap)
3. Consider monetization (ads, premium features)
4. Add to the weekly shipping cycle for improvements

## What "KILL" Means

1. Archive the code (don't delete)
2. Write a 3-sentence postmortem: what we built, why it failed, what we learned
3. Move on to the next product immediately

## Feedback Collection

Every product ships with a minimal feedback widget:

### Widget Requirements
- Non-intrusive (bottom-right corner, collapsed by default)
- Two inputs: sentiment (thumbs up/down) + optional text
- Data stored locally first, synced when backend available
- No login required

### Feedback Categories
- **Bug report**: Something doesn't work
- **Feature request**: Something they want
- **Praise**: Something they like
- **Other**: Free-form

## Evaluation Process

### Week 1 Review (Day 7)
1. Pull Vercel Analytics dashboard
2. Check: unique visitors, session duration, return rate
3. Read all feedback received
4. Adjust sharing/marketing if numbers are low
5. Document findings in the product's issue thread

### Kill/Keep Decision (Day 14)
1. Pull final metrics
2. Score against decision matrix
3. Post decision + reasoning to the product's issue thread
4. If KEEP: create follow-up issues for improvements
5. If KILL: write postmortem, archive

## Template: Kill/Keep Decision

```markdown
## Product: [Name]
## Decision: KEEP / KILL
## Date: YYYY-MM-DD

### Metrics
- Unique visitors (14d): X (threshold: 50)
- Return visitors: X% (threshold: 10%)
- Core action rate: X% (threshold: 60%)
- Avg session: Xs (threshold: 30s)
- Organic traffic: yes/no
- Positive feedback: X (threshold: 3)

### Tier 1: PASS / FAIL
### Tier 2: X/3

### Reasoning
[Why this decision makes sense]

### Lessons
[What we learned for next product]
```
