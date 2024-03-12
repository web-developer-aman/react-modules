import React, { useContext, useEffect, useState } from 'react';
import BlogImg from '../../assets/blog-img.jpg';
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { PostList as postListData } from '../../store/PostListStore';

export default function PostList(){
    const {postList, deletePost} = useContext(postListData)

    return (
        <div className='max-w-[1200px] md:mx-auto mx-2'>
          <ToastContainer />
            <h1 className='text-center text-3xl font-bold my-5'>Blog Posts</h1>
            <div className='text-right'>
                <Link to='/post/create'>
                    <button className='bg-blue-500 py-2 px-5 text-white rounded-md'>Create Post</button>
                </Link>
            </div>
            <div className='grid grid-cols-3 gap-10 py-10'>
                {
                    postList.map(post => (
                        <div key={post.id}>
                            <div className='border rounded-lg shadow-lg'>
                                
                                <img src={post.image ? post.image : BlogImg} alt='Feature Image' className='w-full max-h-[300px] rounded-t-lg' />
                                <div className='p-3'>
                                  <div className='justify-between flex flex-wrap'>
                                    <h5 className='font-bold text-slate-700'>{post.categories}</h5>
                                    <div className='flex gap-2'>
                                      <Link to={`/post/edit/${post.id}`} className='bg-blue-200 hover:bg-blue-600 rounded-lg text-blue-600 hover:text-white p-2 cursor-pointer'>
                                        <MdEdit/>
                                      </Link> 
                                      <span className='bg-red-200 hover:bg-red-600 p-2 rounded-lg text-red-600 hover:text-white cursor-pointer' onClick={() => deletePost(post.id)}><MdDelete/></span>
                                    </div>
                                    
                                  </div>
                                    <Link to={`/post/view/${post.id}`}>
                                      <h3 className='text-xl font-bold mt-2 hover:text-blue-500'>{post.title}</h3>
                                    </Link>
                                    <p className='mb-2 text-slate-500 font-regular'>{post.created_at}</p>
                                    <p>{post.description.length > 250 ? post.description.substring(0, 250) : post.description}
                                    <Link to={`/post/view/${post.id}`}><span className='font-semibold text-blue-600 mt-5'> Continue Reading...</span>
                                    </ Link>
                                    </p>
                                    
                                </div>
                                <div className='flex-wrap flex p-3'>
                                  {
                                    post.tags.map(tag => (
                                      <span key={tag} className='bg-blue-500 px-2 py-1 m-1 rounded-md text-white'>
                                          {tag}
                                      </span>
                                    ))
                                  }
                                </div>
                            </div>
                        </div>
                        
                    ))
                }
                
            </div>
        </div>
    )
}