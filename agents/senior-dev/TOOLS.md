# Tools

## Development

- **Package Manager**: pnpm (use `--ignore-workspace` in product dirs)
- **Testing**: Vitest — run with `pnpm test`
- **Build**: `pnpm build` to verify no TypeScript errors
- **Linting**: Follow existing code patterns

## Vercel Deploy

```bash
cd products/<product-name> && npx vercel --prod
```

**API Auth**: `Authorization: Bearer $VERCEL_TOKEN`

## Product Locations

- **JSONPretty**: `products/jsonpretty/` — Next.js JSON formatter tool
  - Live at: https://jsonpretty-teal.vercel.app
  - Stack: Next.js 15, Tailwind CSS v4, Vitest
