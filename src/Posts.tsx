import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPosts() {
  const resposne = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0'
  );
  return resposne.json();
}

function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  const { data, isLoading } = useQuery<IPost[]>('posts', fetchPosts);
  if (isLoading) return <div />;
  return (
    <>
      <ul>
        {data?.map((post) => (
          <li
            key={post.id}
            className='post-title'
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div>
        <button disabled onClick={() => {}}>
          Previous Page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      {/* <hr />
      {selectedPost && <PostDetail post={selectedPost} />} */}
    </>
  );
}

export default Posts;
