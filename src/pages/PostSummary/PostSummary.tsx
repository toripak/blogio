import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CreateComment } from '../../components/CreateComment';
import { Post } from '../../components/Post';
import { PostComments } from '../../components/PostComments';
import { useFirestoreDoc } from '../../hooks/useFirestoreDoc';

export const PostSummary = () => {
  // struggled with TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.

  const { id } = useParams<{ id?: string }>();
  let { post, error } = useFirestoreDoc('posts', id);

  if (error) {
    return <div>{error}</div>
  };
  if (!document) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {post && (
        <>
          <Post post={post} showPostContent={true} />
          <CreateComment post={post} />
          <PostComments comments={post.comments} />
        </>
      )}
    </div>
  )
}
