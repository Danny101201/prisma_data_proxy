import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({
  log: ['error']
})

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma


type FunctionParamsType<T extends Function> = T extends (...args: infer A) => any ? A : never

const customErrorFunc = async (model:any, query:any, args:any) => {
  try {
    await query(args)
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new Error(`${model} error`)
    }
    throw error;
  }
}

const prismaCustomer = (new PrismaClient()).$extends({
  query: {
    comment: {
      async findFirstOrThrow({ model, query, args }) {
        return await customErrorFunc(model, query, args)
      },
      async findUniqueOrThrow({ model, query, args }) {
        return await customErrorFunc(model, query, args)
      },
    },
    post: {
      async findFirstOrThrow({ model, query, args }) {
        return await customErrorFunc(model, query, args)
      },
      async findUniqueOrThrow({ model, query, args }) {
        return await customErrorFunc(model, query, args)
      },
    },
  },
})

// prismaCustomer.post.findFirstOrThrow({
//   where: {
//     id: 1000
//   }
// }).then(console.log)