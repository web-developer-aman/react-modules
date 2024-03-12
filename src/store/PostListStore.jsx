import React, { createContext, useEffect, useReducer } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const PostList = createContext();

const initialState = {
  postList: [],
};

const postListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return {
        ...state,
        postList: action.payload.posts
      };
    case 'DELETE_POST':
      return {
        ...state,
        postList: state.postList.filter((post) => post.id !== action.payload.postId),
      };
    default:
      return state;
  }
};

export default function PostListProvider({ children }) {
  const [state, dispatchPostList] = useReducer(postListReducer, initialState);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response = await fetch('http://localhost:3000/posts');
        if (response.ok) {
          let data = await response.json();
          dispatchPostList({
            type: 'ADD_POST',
            payload: {
              posts: data,
            },
          });
        } else {
          console.error('Failed to fetch posts data');
        }
      } catch (error) {
        console.error('Error while fetching posts data:', error);
      }
    };

    fetchPosts();
  }, []);


  // Implement the rest of your functions (editPost, updatePost, viewPost) as needed

  const deletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await fetch(`http://localhost:3000/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Update state after successful deletion
        dispatchPostList({
          type: 'DELETE_POST',
          payload: {
            postId: id,
          },
        });

        toast.success('Post deleted successfully');

        // Display success message using toast or any other notification library
      } catch (error) {
        toast.error(error);
        // Display error message using toast or any other notification library
      }
    }
  };

  return (
    <PostList.Provider value={{ ...state, deletePost }}>
      {children}
    </PostList.Provider>
  );
}
