# Product #2: QR Code Generator

## Name
**QRCraft** — Free QR Code Generator

## Tagline
Create beautiful, customizable QR codes instantly. No signup. 100% free.

## Why This Product

### Market Signal
- "QR code generator" has ~500K+ monthly Google searches globally
- Leading competitor (qr-code-generator.com) gets 8.6M monthly visits
- QR code scans grew 433% over the past 4 years (41.7M scans in 2025)
- US accounts for 42-44% of global QR code usage

### Gap We're Filling
Most free QR generators are either:
- Ugly and ad-riddled (qr-code-generator.com, me-qr.com)
- Limited free tiers that push sign-up immediately (Bitly, QR TIGER)
- Overcomplicated with enterprise features

We ship a clean, fast, ad-free tool with generous free features. Same playbook as JSONPretty: best UX wins organic traffic.

### Competitor Landscape (Top 3)
1. **qr-code-generator.com** (8.6M/mo) — Feature-heavy but dated UI, aggressive upselling
2. **QRCode Monkey** (~3M/mo) — Good customization, cluttered interface
3. **me-qr.com** (~2M/mo) — Free dynamic codes, mediocre UX

## Core Features (Free — MVP)

### QR Code Types
- [x] URL / Website link
- [x] Plain text
- [x] WiFi network (SSID, password, encryption type)
- [x] vCard contact
- [x] Email (mailto)
- [x] Phone number (tel)
- [x] SMS

### Customization (Free)
- [x] Foreground color
- [x] Background color
- [x] Error correction level (L/M/Q/H)
- [x] Size control
- [x] Margin/quiet zone control

### Output
- [x] PNG download (high-res up to 1024px)
- [x] Real-time preview as you type
- [x] Copy to clipboard

### UX
- [x] Tab-based type selector (URL, Text, WiFi, Contact, etc.)
- [x] Instant generation (no "Generate" button needed — live preview)
- [x] Mobile-responsive
- [x] Dark mode support

## Pro Features (Future Monetization)

### Tier 1 — Pro ($5/mo)
- SVG download (vector, infinitely scalable)
- Logo/image overlay on QR code center
- Custom dot shapes (rounded, dots, classy)
- Custom eye/finder patterns
- Gradient colors
- Batch generation (up to 50 at once)

### Tier 2 — Business ($15/mo)
- Dynamic QR codes (editable destination URL)
- Scan analytics (count, location, device)
- Custom branded short URLs
- API access
- White-label embedding

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| QR Generation | `qrcode` npm package (client-side) |
| Testing | Vitest |
| Hosting | Vercel |
| Analytics | Vercel Analytics |

### Key Technical Decisions
- **100% client-side**: QR generation happens in the browser. No data leaves the user's device. Zero server cost.
- **No auth needed for MVP**: All features work without signup. Monetization comes later.
- **SSR for SEO**: Landing page and content are server-rendered. Only the QR tool itself is client-side.
- **Same monorepo pattern**: `products/qrcraft/` following the JSONPretty structure.

## SEO Strategy

### Target Keywords
| Keyword | Est. Monthly Volume |
|---------|-------------------|
| qr code generator | 500K+ |
| free qr code generator | 110K+ |
| qr code generator online | 90K+ |
| wifi qr code generator | 40K+ |
| qr code maker | 30K+ |
| vcard qr code generator | 15K+ |

### SEO Pages (MVP)
- `/` — Main tool + H1 targeting "Free QR Code Generator"
- `/about` — About page with schema markup
- `/wifi` — Dedicated WiFi QR code generator page
- `/vcard` — Dedicated vCard QR code generator page

### Technical SEO
- Sitemap.xml and robots.txt
- OpenGraph and Twitter meta tags
- JSON-LD structured data (WebApplication schema)
- Semantic HTML with proper heading hierarchy
- Core Web Vitals optimization (client-side tool loads fast)

## 3-Day Build Plan

### Day 1: Core Tool
- [ ] Scaffold Next.js project in `products/qrcraft/`
- [ ] Build main QR generator component with URL type
- [ ] Add real-time preview with `qrcode` library
- [ ] Implement color customization (foreground, background)
- [ ] Add error correction and size controls
- [ ] PNG download functionality
- [ ] Copy to clipboard
- [ ] Responsive layout with Tailwind

### Day 2: QR Types + Polish
- [ ] Add tab-based type selector UI
- [ ] Implement WiFi QR code generation
- [ ] Implement vCard QR code generation
- [ ] Add Email, Phone, SMS, Plain Text types
- [ ] Dark mode support
- [ ] SEO meta tags, sitemap, robots.txt
- [ ] About page
- [ ] Feedback widget (copy from JSONPretty)

### Day 3: Testing + Deploy
- [ ] Write core logic tests (QR generation, WiFi string encoding, vCard formatting)
- [ ] Add to CI pipeline (`.github/workflows/products-ci.yml`)
- [ ] Deploy to Vercel
- [ ] Verify analytics working
- [ ] Dedicated `/wifi` and `/vcard` landing pages for SEO
- [ ] Final QA pass on mobile + desktop

## Validation Criteria (per VALIDATION_FRAMEWORK.md)

Starting the 14-day clock from deploy date:
- **Tier 1 targets**: 50+ unique visitors, 10%+ return rate, 60%+ core action (= QR code generated)
- **Tier 2 targets**: >30s avg session, organic search traffic, 3+ positive feedback
- **Kill/keep decision**: Day 14 post-launch

## File Structure

```
products/qrcraft/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with metadata
│   │   ├── page.tsx          # Main QR generator tool
│   │   ├── about/page.tsx    # About page
│   │   ├── wifi/page.tsx     # WiFi QR dedicated page
│   │   ├── vcard/page.tsx    # vCard QR dedicated page
│   │   ├── sitemap.ts        # Dynamic sitemap
│   │   └── robots.ts         # Robots.txt
│   ├── components/
│   │   ├── QRGenerator.tsx   # Main generator component
│   │   ├── QRPreview.tsx     # Live QR code preview
│   │   ├── TypeSelector.tsx  # Tab selector for QR types
│   │   ├── ColorPicker.tsx   # Color customization
│   │   └── DownloadButton.tsx
│   └── lib/
│       ├── qr-types.ts       # Type definitions and encoders
│       ├── wifi-encoder.ts   # WiFi string encoder
│       ├── vcard-encoder.ts  # vCard string encoder
│       └── seo.ts            # SEO utilities
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── vitest.config.ts
```
