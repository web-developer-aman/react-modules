import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogImg from '../../assets/blog-img.jpg';

export default function View(){
    const { id} = useParams();
    const [post, setPost] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        // Fetch student data based on the id
        const fetchStudentData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/posts/${id}`);
            if (response.ok) {
              const data = await response.json();
              setPost(data);
            } else {
              setErrors('Failed to fetch student data');
            }
          } catch (error) {
            console.error('Error while fetching student data:', error);
          }
        };
    
        fetchStudentData();
    }, [id]);

    return (
        <div className='max-w-[1240px] py-10 mx-auto'>
           {
            post? (
                <div>
                    <img src={post.image ? post.image : BlogImg} alt="Feature Image" className='w-full max-h-[400px]'/>
                    <h1 className='text-4xl font-semibold mt-5 mb-1'>{post.title}</h1>
                    <h5 className='text-md'>Posted at: <span className='font-semibold text-slate-600'>{post.created_at}</span></h5>
                    <p className='mt-5 text-lg'>{post.description}</p>
                </div>
            ) : (
                <div class="bg-red-100 border w-[60%] mx-auto border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Holy smokes! </strong>
                    <span class="block sm:inline">{errors}</span>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>
            )
           }
        </div>
    )
}