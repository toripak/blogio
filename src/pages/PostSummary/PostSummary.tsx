import { Link, useParams } from 'react-router-dom';
import { CreateComment } from '../../components/CreateComment';
import { Post } from '../../components/Post';
import { PostComments } from '../../components/PostComments';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestoreDoc } from '../../hooks/useFirestoreDoc';

export const PostSummary = () => {
  // struggled with TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  const { id } = useParams<{ id?: string }>();


  const { user } = useAuthContext();
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
          {user && <CreateComment post={post} />}
          {!user && (
            <div className="container-md m-2 flex flex-col items-center">
              <div className='my-2 flex flex-col items-center'>
                <h2 className='font-bold '>Comments ({post.comments.length}) </h2>
                <p className='italic text-sm'>Please <Link to='/login' className='text-blue-600 underline'>log in</Link>  to leave comments</p>
              </div>
            </div>
          )}
          <PostComments comments={post.comments} />
        </>
      )}
    </div>
  )
}
