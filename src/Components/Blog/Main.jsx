import React from 'react';
import PostList from './PostList';
import PostListProvider from '../../store/PostListStore';
export default function Main(){
    return (
        <>
            <PostListProvider>
                <PostList />
            </PostListProvider>
        </>
    );
}