import { DocumentData } from 'firebase/firestore';
import { userInfo } from 'os';
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from './Avatar';

type Props = {
  posts: DocumentData[] | null
}

export const PostList: React.FC<Props> = ({ posts }) => {
  console.log(posts)

  return (
    <div className='container-md m-3 '>

      {posts?.map(post => (
        <div className='m-2 p-2 flex flex-col border border-gray-100 backdrop-blur-md rounded shadow-sm bg-white/40 '>
          <Link to={`/feed/${post.id}`} key={post.id} >
            <Avatar img={post.postedBy.photoURL} id={post.postedBy.id} />
            {/*testing*/}
            <h2>{post.title}</h2>
            <p>{post.postContent}</p>
            <p>{post.postedBy.displayName}</p>
            <p>{(post.createdAt).toDate().toLocaleDateString()}</p>

          </Link>
        </div>
      ))}

    </div>
  )
}
