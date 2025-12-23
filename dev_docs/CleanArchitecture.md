# Clean Architecture
This is one of the most powerful ways to structure a large-scale Next.js application. Using **Clean Architecture (CA)** ensures your business logic is completely decoupled from Next.js (the framework) and Prisma (the ORM), making your app resilient and highly testable.

Here is a folder structure designed for Next.js (App Router), leveraging a dedicated `src/` directory to cleanly separate your application code (`core`, `infrastructure`) from the Next.js presentation layer (`app`).

-----

## 🏗️ Clean Architecture Folder Structure for Next.js + Prisma

This structure is organized around the four main layers of Clean Architecture:

1.  **Presentation (Outer Ring):** `app/`
2.  **Infrastructure (Interface Adapters):** `infrastructure/`
3.  **Use Cases (Interactors):** `core/use-cases/`
4.  **Entities (Innermost Ring):** `core/entities/`

<!-- end list -->

```
src/
├── app/                  # 1. Presentation Layer (Next.js UI/Pages)
│   ├── (auth)/
│   ├── dashboard/
│   ├── api/              # API Routes - Call Use Cases directly
│   └── layout.tsx
├── core/                 # 2. Core Business Logic (Framework Agnostic)
│   ├── entities/         #    - Innermost Ring
│   │   ├── User.ts       #    (Pure TypeScript interfaces/classes)
│   │   └── Post.ts
│   ├── ports/            #    - Repository Interfaces (Gateways)
│   │   ├── IUserRepository.ts  # (Defines methods like `findById`, `save`)
│   │   └── IPostRepository.ts
│   └── use-cases/        #    - Business Logic (Interactors)
│       ├── user/
│       │   ├── createUser.ts   # (Accepts dependencies: IUserRepository)
│       │   └── getUserProfile.ts
│       └── post/
│           └── publishPost.ts
└── infrastructure/       # 3. Infrastructure Layer (Implementation Details)
    ├── data-providers/   #    - Repository Implementations
    │   ├── PrismaUserRepository.ts   # (Implements IUserRepository, knows Prisma)
    │   └── PrismaPostRepository.ts
    ├── services/         #    - External Services (Email, SMS)
    └── lib/              #    - External dependencies (e.g., Prisma client setup)
        └── prisma.ts     #    (The actual Prisma client instance)
```

-----

## Explanation of the Layers

### 1\. The Core Layer (`src/core`)

This is the most crucial part. It is completely isolated and contains zero knowledge of Next.js, HTTP, or Prisma.

| Folder | Content | Dependency Rule |
| :--- | :--- | :--- |
| `core/entities` | Defines the fundamental data structures/models (e.g., `interface User { id: string; email: string; }`). | Depends on nothing. |
| `core/ports` | Defines **interfaces** (or "ports") for all external services (like databases, email, or third-party APIs). | Depends only on **Entities**. |
| `core/use-cases` | Contains the actual business logic (e.g., "The user must be over 18 to create an account"). The functions here accept the **Ports** (interfaces) as dependencies. | Depends only on **Ports** and **Entities**. |

### 2\. The Infrastructure Layer (`src/infrastructure`)

This layer implements the interfaces defined in the `core/ports`. This is where all external framework knowledge lives.

| Folder | Content | Why it matters for Prisma |
| :--- | :--- | :--- |
| `data-providers` | This is where you create concrete classes like `PrismaUserRepository` that **implement** the `IUserRepository` interface. | It translates the generic methods defined in the Core (`save(user: User)`) into specific Prisma calls (`prisma.user.create({ data: user })`). **This folder knows Prisma exists.** |
| `lib` | Contains the singleton instance of the Prisma client. | The `data-providers` import and use this client. |

### 3\. The Presentation Layer (`src/app`)

This is the Next.js App Router structure. Its sole job is to translate user input (HTTP requests, form submissions) into calls to the Use Cases, and then translate the Use Case results back into HTTP responses or rendered UI.

| Location | Role | Dependency Flow |
| :--- | :--- | :--- |
| `app/api/...` | **API Routes / Server Actions.** | **Instantiates** the Use Cases and their required Infrastructure dependencies. (e.g., `new CreateUser(new PrismaUserRepository())`) |
| `app/dashboard/...` | **Server Components.** | Fetch data by directly calling Use Cases (since they run on the server). |

### Example Implementation Flow

1.  **`src/core/ports/IUserRepository.ts`** (The Contract)

    ```typescript
    // IUserRepository.ts
    export interface IUserRepository {
      save(user: User): Promise<User>;
      findById(id: string): Promise<User | null>;
    }
    ```

2.  **`src/infrastructure/data-providers/PrismaUserRepository.ts`** (The Implementation)

    ```typescript
    // PrismaUserRepository.ts
    import { prisma } from '@/infrastructure/lib/prisma'; // Dependency on the Framework
    import { IUserRepository } from '@/core/ports/IUserRepository';
    // ... implements IUserRepository and uses prisma client methods
    ```

3.  **`src/app/api/user/route.ts`** (The Entry Point)

    ```typescript
    // route.ts - Next.js API Route
    import { CreateUser } from '@/core/use-cases/user/createUser';
    import { PrismaUserRepository } from '@/infrastructure/data-providers/PrismaUserRepository';

    export async function POST(req: NextRequest) {
      // 1. Assemble the dependency graph (The "Composition Root")
      const userRepository = new PrismaUserRepository();
      const createUserUseCase = new CreateUser(userRepository); // Use Case doesn't care it's Prisma
      
      // 2. Execute the Use Case
      const userData = await req.json();
      const newUser = await createUserUseCase.execute(userData);
      
      return NextResponse.json(newUser, { status: 201 });
    }
    ```

    ## References
    [1] [Clean Architecture by Example in 5 Minutes](https://www.youtube.com/watch?v=xuFpizWxDs0)