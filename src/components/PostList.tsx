import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { Post } from './Post';

type Props = {
  showPostContent: Boolean;
  posts: DocumentData[] | null;
}

export const PostList: React.FC<Props> = ({ posts, showPostContent }) => {

  return (
    <>
      {posts?.map(post =>
        <Post
          key={post.id}
          post={post}
          showPostContent={showPostContent}
        />)}
    </>
  )
}
