# Architecture
- Keep the existing single-route tab shell; store tab return frames and scroll offsets in memory through navigation-history helpers so back controls never use browser history.
- Home shortcuts and navigation presentation belong to shell.tsx; learning content stays in lazy-loaded tab components so navigation changes do not modify lessons.