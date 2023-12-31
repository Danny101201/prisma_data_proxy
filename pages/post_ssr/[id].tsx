import { GetServerSideProps } from 'next'
import PostComponent from 'components/post'
import { PrismaClient, Post, Comment } from '@prisma/client'
import {
  deletePost,
  incrementLikes,
  incrementViews,
  submitComment,
} from 'lib/api'

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const matchPost = await prisma.post.findUnique({
    where: {
      id: Number(params?.id)
    },
    include: {
      comments: {
        orderBy: {
          id: 'desc'
        }
      }
    }
  })
  if (!matchPost) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      post: matchPost
    }
  }
}

type PostPageProps = {
  post: Post & {
    comments: Comment[]
  }
}

const PostPage: React.FC<PostPageProps> = (props) => {
  return (
    <PostComponent
      post={props.post}
      onDeletePost={deletePost}
      onSubmitComment={submitComment}
      onLikePost={incrementLikes}
      onViewPost={incrementViews}
    />
  )
}

export default PostPage
