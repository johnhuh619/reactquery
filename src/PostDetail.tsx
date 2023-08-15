import React from 'react';
import { useQuery } from 'react-query';
import { IPost } from './Posts';
interface IPostDetailProps {
  post: IPost;
}
interface IComments {
  id: number;
  email: string;
  body: string;
}

async function fetchComments(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

export function PostDetail({ post }: IPostDetailProps) {
  // replace with useQuery
  const {data, isLoading, isError}  = useQuery<IComments[]>(['comments',post.id], () => fetchComments(post.id));
 // fetchComments는 postId를 인자로 받기 때문에 익명함수로 감싸서 작성한다
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {
        isError && <div>ERROR!</div>
      }
      {
        isLoading ?(
          <div>Loading...</div>
        ) : (
          data?.map((comment) => (
            <li key={comment.id}>
              {comment.email}: {comment.body}
            </li>
          ))
        )
      }
    </>
  );
}