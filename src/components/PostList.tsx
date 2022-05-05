import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { Post } from './Post';

type Props = {
  posts: DocumentData[] | null
}

export const PostList: React.FC<Props> = ({ posts }) => {
  console.log(posts)



  return (
    <>
      {posts?.map(post => <Post key={post.id} post={post} />)}
    </>
  )
}
