# Tools

## Vercel CLI & API

You can deploy products to Vercel and check deployment status.

**Deploy to production**:
```bash
cd products/<product-name> && npx vercel --prod
```

**API Auth**: `Authorization: Bearer $VERCEL_TOKEN`

**List deployments**:
```
GET https://api.vercel.com/v6/deployments?projectId=$VERCEL_PROJECT_ID&limit=5
```

**Check deployment logs**:
```bash
npx vercel inspect <deployment-url> --logs
```

### Live Products
- **JSONPretty**: https://jsonpretty-teal.vercel.app (code: `products/jsonpretty/`)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm (use `--ignore-workspace` in product dirs)
- **Hosting**: Vercel (free tier)
- **Analytics**: Vercel Web Analytics (auto-collected)
- **Testing**: Vitest

## Deployment Workflow

1. Build and test locally: `pnpm build && pnpm test`
2. Deploy preview: `npx vercel`
3. Deploy production: `npx vercel --prod`
4. Verify live: check the production URL
