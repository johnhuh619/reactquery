import React from 'react';
import {useState, useEffect } from "react";
import { useQuery, useQueryClient } from 'react-query';
import { PostDetail } from "./PostDetail.tsx";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const maxPostPage = 10;
async function fetchPosts(pageNum: number) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

function Posts() {
  console.log("Rendering PostDetail");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  
  const queryClient = useQueryClient();

  // replace with useQuery
  const {data, isLoading, isError} = useQuery<IPost[]>(
    ['posts',currentPage],
    ()=>fetchPosts(currentPage),
    {
      staleTime: 2000, //staleTime 2초로 설정 => fetch data는 2초간 fresh
      keepPreviousData: true
    }
  );
  useEffect(()=>{
    if(currentPage <= maxPostPage - 2){
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(['posts',nextPage], () =>
        fetchPosts(nextPage)
        );
    }
  })
  if(isError) return <h3>ERROR!!</h3>;
  if(isLoading) return <h3>Loading...</h3>;
  return (
    <>
      <ul>
        {data?.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage >= maxPostPage - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}

export default Posts