# References
## React.js Concepts
1. [Context and Providers](https://react.dev/learn/passing-data-deeply-with-context)
2. [Hooks](https://react.dev/reference/react/hooks)
   - Helps to use different React features from component

## Rendering types in web
1. [CSR, SSG, SSR, ISR tutorial](https://www.youtube.com/watch?v=p02AIAoImzU)

## MUI concepts
1. NextAppProvider  
   NextAppProvider acts as the central configuration provider for a MUI Toolpad application running on Next.js, ensuring that all Toolpad components have access to the necessary context and seamlessly interact with the Next.js environment. It inherits the capabilities of the base AppProvider while adding specific optimizations and integrations tailored for Next.js
2. [MUI Next.js Integration](https://mui.com/material-ui/integrations/nextjs/)   
3. [MUI React CRUD](https://mui.com/toolpad/core/react-crud/)

## Material React Table
1. [Material React Table : export CSV](https://www.material-react-table.com/docs/examples/export-csv)

## Auth.js concepts for Next.js App
1. [Protecting Resources](https://authjs.dev/getting-started/session-management/protecting)
2. [Get Session](https://authjs.dev/getting-started/session-management/get-session)
3. [Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
4. [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)

## Routing in Next.js
1. [Blog : Building APIs with Next.js](https://nextjs.org/blog/building-apis-with-nextjs)
2. [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
3. Helps to create API in Next.js
4. Helps to route requests to external services. This also helps to authenticate the request with
   Next.js
5. Just create route.js in folder where API is to be formed
6. If your data is only used inside your Next.js app, you may not need a public API at all

## Routing path or API design
1. If you want to use POST for all requests then you can attach these verbs to the noun or entity
   "listing," "search," "filter," "query," or "retrieve"  

## Actions in Next.js 
1. [Server Actions and Mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
2. [Best reference to useActionState hook](https://react.dev/reference/react/useActionState)

## Prisma ORM
1. Creating a Prisma based project  
   `npx prisma init`  
   `npx prisma init --datasource-provider sqlite`
2. Generate schema.prisma from database  
   `npx prisma db pull`
3. [Prisma client CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud)   
## Others
+  Environment file
   - .env: Shared, default configuration, committed to Git.
   - .env.local: Local, developer-specific overrides and secrets, never committed to Git.  