## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma basics

To view data in the database, run below command
- npx prisma studio

After editing schema.prisma file, please make sure to run below commands

- npx prisma generate
- npx prisma migrate dev --name {name of the action you're doing}