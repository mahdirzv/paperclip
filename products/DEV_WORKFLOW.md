# Development Workflow

How we ship micro-SaaS products fast.

## Repository Structure

```
products/
  VALIDATION_FRAMEWORK.md   # Kill/keep decision process
  DEV_WORKFLOW.md           # This file
  jsonpretty/               # Product 1: JSON tools
  <next-product>/           # Product 2: TBD
```

Each product is a self-contained project with its own `package.json`, dependencies, and deploy config.

## Git Workflow

**Branch strategy:** trunk-based development on `master`.

- Ship directly to `master` for micro-SaaS products (speed > ceremony at this stage)
- Use feature branches for changes to the Paperclip platform itself
- Each product deploys independently via Vercel

**Commit style:**
- Prefix with product name: `jsonpretty: add YAML converter`
- Keep commits small and atomic
- Always include `Co-Authored-By: Paperclip <noreply@paperclip.ing>` for agent commits

## CI/CD Pipeline

### Automated (GitHub Actions)
- `.github/workflows/products-ci.yml` runs on PRs touching `products/`
- Per-product: install, build, test
- Only tests changed products (path filtering)

### Deployment (Vercel)
- Each product has its own Vercel project
- Deploy: `vercel --yes --prod` from the product directory
- Vercel handles preview deployments on PRs automatically
- Production URL aliased at: `<product>-teal.vercel.app` (or custom domain when available)

## Testing

- **Framework:** Vitest
- **What to test:** Core logic (utilities, transformations, business rules)
- **What NOT to test:** React component rendering (too much ceremony for MVPs)
- **Run tests:** `pnpm test` from the product directory
- **Watch mode:** `pnpm test:watch`

## Adding a New Product

1. Create `products/<name>/` with a Next.js project
2. Add to `.github/workflows/products-ci.yml` path filter
3. Deploy to Vercel: `cd products/<name> && vercel --yes --prod`
4. Add feedback widget (copy from existing product)
5. Start the 14-day validation clock (see `VALIDATION_FRAMEWORK.md`)

## Monitoring & Analytics

- **Vercel Analytics:** Built-in, enabled by default on all deployments
- **Feedback widget:** Embedded in every product, stores to localStorage
- **Uptime:** Vercel handles this; check deployment status in dashboard

## Tools

| Tool | Purpose |
|------|---------|
| pnpm | Package manager |
| Next.js 15 | React framework |
| Tailwind CSS 4 | Styling |
| Vitest | Testing |
| Vercel | Hosting & deployment |
| GitHub Actions | CI checks |
