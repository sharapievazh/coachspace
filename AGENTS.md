# Architecture
- Keep the existing single-route tab shell; store tab return frames and scroll offsets in memory through navigation-history helpers so back controls never use browser history.
- Home shortcuts and navigation presentation belong to shell.tsx; learning content stays in lazy-loaded tab components so navigation changes do not modify lessons.
- Keep new glossary and feedback tools in separate lazy tab modules; global search uses a browser-safe metadata index without importing lesson modules so search does not eagerly load learning content.
- Extend the existing on-device notes store for feedback records and search; preserve its format so current user notes remain readable.