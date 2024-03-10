import React, { useEffect, useState } from 'react';
import BlogImg from '../../assets/blog-img.jpg';
import { Link } from 'react-router-dom';

export default function PostList(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            let response = await fetch('http://localhost:3000/posts');
            if (response.ok) {
              let data = await response.json();
              setPosts(data);
            } else {
              console.error('Failed to fetch student data');
            }
          } catch (error) {
            console.error('Error while fetching student data:', error);
          }
        };
    
        fetchPosts();
      }, []);
    return (
        <div className='max-w-[1200px] md:mx-auto mx-2'>
            <h1 className='text-center text-3xl font-bold my-5'>Blog Posts</h1>
            <div className='text-right'>
                <Link to='/post/create'>
                    <button className='bg-blue-500 py-3 px-5 text-white rounded-md'>Create Post</button>
                </Link>
            </div>
            <div className='grid grid-cols-3 gap-10 py-10'>
                {
                    posts.map(post => (
                        <div>
                            <Link to={`/post/view/${post.id}`}>
                            <div key={post.id} className='border rounded-lg shadow-lg'>
                                
                                <img src={post.image ? post.image : BlogImg} alt='Feature Image' className='w-full max-h-[300px] rounded-t-lg' />
                                <div className='p-3'>
                                    <h5 className='font-bold text-slate-700'>{post.categories}</h5>
                                    <h3 className='text-xl font-bold mt-2'>{post.title}</h3>
                                    <p className='mb-2 text-slate-500 font-regular'>{post.created_at}</p>
                                    <p>{post.description.length > 250 ? post.description.substring(0, 250) : post.description}<span className='font-semibold text-blue-600 mt-5'> Continue Reading...</span></p>
                                    
                                </div>
                            </div>
                            </Link>
                        </div>
                        
                    ))
                }
                
            </div>
        </div>
    )
}