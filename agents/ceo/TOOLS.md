# Tools

## Vercel API

You have access to the Vercel API for deployment management and analytics.

**Auth**: Use `Authorization: Bearer $VERCEL_TOKEN` header on all requests.

### Key endpoints

**List projects**:
```
GET https://api.vercel.com/v9/projects
```

**Get project details** (JSONPretty):
```
GET https://api.vercel.com/v9/projects/$VERCEL_PROJECT_ID
```

**List deployments**:
```
GET https://api.vercel.com/v6/deployments?projectId=$VERCEL_PROJECT_ID&limit=10
```

**Get deployment details**:
```
GET https://api.vercel.com/v13/deployments/{deploymentId}
```

**Web Analytics** (if enabled):
```
GET https://vercel.com/api/web-analytics/timeseries?projectId=$VERCEL_PROJECT_ID&from=YYYY-MM-DD&to=YYYY-MM-DD&environment=production
```

**Speed Insights**:
```
GET https://vercel.com/api/speed-insights/timeseries?projectId=$VERCEL_PROJECT_ID&from=YYYY-MM-DD&to=YYYY-MM-DD&environment=production
```

### Environment variables
- `VERCEL_TOKEN` — API bearer token
- `VERCEL_PROJECT_ID` — JSONPretty project ID (`prj_sGFKlOOlgpXkgQMfwdMiraz2kXEd`)
- `VERCEL_TEAM_ID` — Team ID (`team_XywNOCSBIDOaAOZVbWnqapIa`)

### Live URLs
- **Production**: https://jsonpretty-teal.vercel.app
- **Vercel Dashboard**: https://vercel.com/mahdis-projects-046bd4af/jsonpretty
