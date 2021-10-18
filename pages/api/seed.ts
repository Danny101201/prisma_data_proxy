import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { seedPosts } from 'lib/posts'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await prisma.post.deleteMany()
  const promises = []

  for (const post of seedPosts) {
    promises.push(
      prisma.post.create({
        data: {
          title: post.title,
          excerpt: post.excerpt,
          comments: {
            create: post.comments.map((comment) => ({ comment })),
          },
        },
      }),
    )
  }
  const createdPosts = await Promise.all(promises)

  res.statusCode = 200
  res.json(createdPosts)
}
