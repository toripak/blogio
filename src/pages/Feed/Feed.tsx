import { PostList } from "../../components/PostList";
import { useCollection } from "../../hooks/useCollection";

export const Feed = () => {
  const { posts, error } = useCollection('posts');

  return (
    <div>
      <PostList posts={posts} />
    </div>
  )
}
