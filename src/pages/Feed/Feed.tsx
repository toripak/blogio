import { where } from "firebase/firestore";
import { PostList } from "../../components/PostList";
import { useCollection } from "../../hooks/useCollection";

export const Feed = () => {
  const { posts, error } = useCollection('posts', undefined, ['createdAt', 'desc']);

  return (
    <div>
      <PostList posts={posts} />
      {error && <p>{error}</p>}
    </div>
  )
}
