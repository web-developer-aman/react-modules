import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageNotFound from '../../assets/image-not-found.jpg';

export default function CreatePost(){
    const [featureImg, setFeatureImg] = useState("");
    const [errors, setErrors] = useState({});
    const [tagValue, setTagValue] = useState("");
    const [tags, setTags] = useState([]);

    const categories = [
        'Lifestyle & Wellness',
        'Entertainment',
        'Health & Fitness',
        'Music',
        'Politics',
        'Science',
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          // You can perform additional checks or operations here if needed
          setFeatureImg(URL.createObjectURL(file));
        }
    }
    const addTags = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            if (tagValue.trim() !== '') {
                setTags([...tags, tagValue.trim()]);
                setTagValue("");
            }
        }
    };

    const handleTagRemove = (tagToRemove) => {
        const updatedTags = tags.filter(tag => tag !== tagToRemove);
        setTags(updatedTags);
    };

    const submitPost = async (e) => {
        e.preventDefault();
        const errors  = {};
        const postList = {};

        // Using Array.from to convert e.target.elements to an array
        Array.from(e.target.elements).forEach((input) => {
            if(!input.value.trim() && input.name == 'title' || !input.value.trim() && input.name == 'categories'){
                errors[input.name] = `The ${input.name} field is required`;
            }else if(input.name){
                postList['id'] = JSON.stringify(Math.floor(Math.random() * 1000));
                postList[input.name] = input.value;
                postList['created_at'] = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' });
                postList['tags'] = tags;
                if (input.type !== 'select-one'){
                    input.value = null;
                    setTags([])
                }
            }
        });

        if (Object.keys(errors).length === 0) {
            // Assuming your JSON Server endpoint is http://localhost:3000/posts
            try {
                const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...postList, image: featureImg }),
                });

                if (response.ok) {
                    setFeatureImg(null);
                    setErrors({});
                    toast.success('Post Created successfully', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                } else {
                    toast.error('Failed to submit post data', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    console.error('Failed to submit post data');
                }
            } catch (error) {
                console.log(error);
            }
        }else{
            setErrors(errors);
        }
        
    }
    return (
        <div className='max-w-[1240px] md:mx-auto mx-3'>
            <ToastContainer />
            <h1 className='text-3xl font-bold text-center my-5'>Create Post</h1>
            <div className='text-right'>
                <Link to='/posts'>
                    <button className='bg-slate-500 py-2 px-5 rounded text-white'>Back to posts list</button>
                </Link>
            </div>
            <div className='p-3 md:max-w-[70%] rounded mx-auto mt-5 py-10'>
                <form onSubmit={(e) => submitPost(e)}>
                    <label htmlFor="file" className='block text-gray-700 text-sm font-bold mb-2'>Feature Image</label>
                    <div className='mb-5 w-[200px]'>
                        <label htmlFor='imageInput'>
                            <img
                                src={featureImg ? featureImg : imageNotFound}
                                alt='Feature Image'
                                className='w-[200px] h-auto rounded border cursor-pointer'
                            />
                            
                        </label>
                        <input type="file" id="imageInput" accept="image/*" className='hidden' onChange={handleImageChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="title" className='block text-gray-700 text-sm font-bold mb-2'>Title <span className='text-red'>*</span></label>
                        <input id='title' type="text" name='title' className='border rounded-lg p-3 w-full focus:outline-none'/>
                        {errors.title && <p className='text-red-500 pt-1'>{errors.title}</p>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="description" className='block text-gray-700 text-sm font-bold mb-2'>Description</label>
                        <textarea id='description' name='description' className='border rounded-lg p-3 w-full focus:outline-none' rows='3'></textarea>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="category" className='block text-gray-700 text-sm font-bold mb-2'>Category</label>
                        <select name="categories" id="categories" className='border rounded-lg p-3 w-full focus:outline-none'>
                            {
                                categories.map((category, index) => (
                                    <option key={category} value={category}>{category}</option>
                                ))
                            }
                        </select>
                        {errors.categories && <p className='text-red-500 pt-1'>{errors.categories}</p>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="tags" className='block text-gray-700 text-sm font-bold mb-2'>Tags</label>
                        {
                            tags.map((tag, index) => {
                                return (
                                    <button key={index} className="bg-blue-500 px-2 pb-1 m-1 rounded-md text-white cursor-pointer">
                                        {tag} <span className='text-[10px] mt-[20px]' onClick={() => handleTagRemove(tag)}>&#10005;</span>
                                    </button>
                                )
                            })
                        }
                        <input id='tags' type="text" name='tags' className='mt-2 border rounded-lg p-3 w-full focus:outline-none' placeholder='Type and press Enter to add tags' value={tagValue} onKeyDown={addTags} onChange={(e) => setTagValue(e.target.value)}/>
                    </div>
                    <div className='flex justify-end'>
                        <button className='bg-blue-500 py-2 px-5 rounded text-white'>Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}