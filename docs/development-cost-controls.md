# Development cost controls

Automatic Vercel Git deployments are disabled on every branch, including main. Production releases and previews must be requested deliberately. Existing hosted deployments remain available and can still generate runtime usage.

All checked-in GitHub Actions workflows are manual (workflow_dispatch). In GitHub Actions, choose the workflow, Run workflow, and the branch to test. Run quality checks before merging or deploying. Blob Server stable images publish only when its release workflow is manually run on main. Android APKs and browser evidence are created only by manual runs.

## What to expect

| Symptom | Cause or check | Action |
|---|---|---|
| A push has no new preview | Development auto-deploy is disabled | Request an intentional preview deploy; don't repeatedly push or retry |
| A merge is waiting for checks | A required check is manual | Run that workflow on the requested branch; check branch rules if GitHub still waits |
| CI says it passed but screenshots are old | A prior run was opened | Compare the run commit SHA with the current branch |
| The server or APK hasn't updated | Image/APK builds are manual | Run the matching workflow; download/update deliberately |
| A website hasn't changed | The current deployment has an older commit | Compare deployment SHA with code; release intentionally |
| Costs rise without commits | Existing displays, API traffic, streams, monitoring, or subscriptions | Inspect usage by project and busiest routes; don't blame builds automatically |
| Phone/email sign-in consumes usage | A real verification request reached the provider | Avoid repeated real verification during development; never bypass account verification |
| Ask Home consumes AI usage | An enabled assistant received a real request | Use manual planning/saved meal matching; HOME_ASSISTANT_ENABLED controls real AI in Home |
| Media transfer rises | Playback/downloads use hosted media | Prefer local media and the local server during development |
| Board data looks stale | Connectivity, update transport, authentication, or a deployed bug | Confirm connection and latest deployed version before changing polling settings |

## Scope and limits

These repository controls do not disable paid provider monitoring, set billing limits, stop already-running workflows, close browser displays, pause databases, or remove existing preview deployments. Existing branches without these controls must receive them before further development. Runtime polling and real provider calls remain as implemented; they have not been replaced with mocks.

No data or databases were deleted or paused. Supabase was last checked on the Free plan with no preview branches. Gym's daily media cleanup is preserved because it bounds stored media. No other Vercel cron definitions were found in the inspected repositories.

To restore automatic CI, restore explicit workflow triggers. To restore a development auto-deployment, change git.deploymentEnabled in vercel.json deliberately. Avoid re-enabling every branch while iterating. Turning off emails does not turn off usage.

Applied October 3, 2026. This is a development cost-control policy, not a guarantee of zero charges.
