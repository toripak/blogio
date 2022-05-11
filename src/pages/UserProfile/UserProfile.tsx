import { useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { PostList } from '../../components/PostList';
import { useCollection } from '../../hooks/useCollection';
import { useFirestoreDoc } from '../../hooks/useFirestoreDoc';

export const UserProfile = () => {
  const { uid } = useParams<{ uid?: string }>();

  const { document, error } = useFirestoreDoc('users', uid);
  const { posts } = useCollection('posts', ['postedBy.id', '==', uid]);

  if (error) {
    return <div>Error</div>
  }

  return (
    <div>
      <div className='container-md m-3 flex rounded flex-col items-center'>
        <img
          className='w-full h-48 2xl:h-56 shadow-md opacity-40 rounded object-cover'
          src={'https://source.unsplash.com/random/?sky,pastel'}
          alt="banner"
        />
        {document && <div className='relative -top-7 scale-150 '>
          <Avatar img={document.photoURL} id={document.id} />
        </div>}
      </div>
      {document && <PostList posts={posts} showPostContent={false} />}
    </div>
  )
}
