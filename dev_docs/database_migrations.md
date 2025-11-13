
# Datatbase
## Setting up Prisma for Next.js
   - `npm install prisma --save-dev`
   - `npm install @auth/prisma-adapter`
   - create app/lib/db/schema.prisma file with suitable ER
   - `npx prisma generate` You need to rerun this if `schema.prisma` is updated.
   - `npx prisma studio` used to view database
## Database Migrations
### For a fresh start
1. Migrate with prisma
   - `npx prisma migrate dev --schema=prisma/schema.prisma`
   - The above step creates database physical model from the conceptual model specified in the schema.prisma
   - The above action can also be done by `npx prisma db push` but less
     safe
2. `npm run dev`
3. For droping database and reset `npx prisma reset`

## References
1. https://vercel.com/guides/nextjs-prisma-postgres
2. https://authjs.dev/getting-started/adapters/prisma
3. [Prisma : Connect your database](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgresql)