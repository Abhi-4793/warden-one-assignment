1. **“Modularize backend logic into controller, service, and utils files.”**  
   → Split large logic file for maintainability.

2. **“Fix filter logic — show only 20 results and search correctly.”**  
   → Re-ordered Prisma queries and in-memory filters.

3. **“Add debounce to frontend search so results only fetch after typing stops.”**  
   → Implemented `useDebounce` hook for smooth UX.

4. **“Resolve Prisma ‘Unknown argument mode’ error.”**  
   → Adjusted schema query to remove unsupported `mode`.
