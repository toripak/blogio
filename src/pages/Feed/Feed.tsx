import { PostList } from "../../components/PostList";
import { useCollection } from "../../hooks/useCollection";

export const Feed = () => {
  const { posts, error } = useCollection('posts', undefined, ['createdAt', 'desc']);


  return (
    <div>
      <PostList posts={posts} showPostContent={false} />
      {error && <p className="m-2 text-red-600">{error}</p>}
    </div>
  )
}
