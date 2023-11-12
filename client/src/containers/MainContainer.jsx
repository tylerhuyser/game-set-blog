import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../screens/Home";
import About from '../screens/About'
import PostDetail from '../screens/PostDetail'
import PostsByCategory from '../screens/PostsByCategory'
import PostsByTag from '../screens/PostsByTag'

import {
  getPostsByCategory,
  getPostsByTag
} from '../services/posts'

export default function MainContainer(props) {
  
  const { posts, tags, categories, users } = props
  const { setPageTitle, setPageDescription } = props
  
  return (

    <>
      
      {posts && tags && categories && users ?
      
        <>
          <Routes>

            <Route exact path="/" element={
              <Home posts={posts} tags={tags} categories={categories} users={users} />
            } />

            <Route path="/about" element={
              <About setPageTitle={setPageTitle} />
            }  />

            {/* <Navigate from="/:id/:slug" to="/posts/:slug" /> */}

            <Route path="/posts/:id/:slug" element={<Navigate to="/posts/:slug" />} />
            {/* <Navigate from="/posts/:id/:slug" to="/posts/:slug" /> */}

            <Route path="/posts/:id/:slug/" element={<Navigate to="/posts/:slug" />} />
            {/* <Navigate from="/posts/:id/:slug/" to="/posts/:slug" /> */}

            <Route path="/:year/:month/:date/:slug" element={<Navigate to="/posts/:slug" />} />
            {/* <Navigate from="/:year/:month/:date/:slug" to="/posts/:slug" /> */}

            <Route path="/:year/:month/:date/:slug/" element={<Navigate to="/posts/:slug" />} />
            {/* <Navigate from="/:year/:month/:date/:slug/" to="/posts/:slug" /> */}

            <Route path="/posts/:slug" element={
              <PostDetail posts={posts} tags={tags} categories={categories} users={users} setPageTitle={setPageTitle} setPageDescription={setPageDescription} />
            } />

            <Route path="/categories/:id/:slug" element={
              <PostsByCategory posts={posts} tags={tags} categories={categories} users={users} getPostsMethod={getPostsByCategory} setPageTitle={setPageTitle} setPageDescription={setPageDescription} />
            } />

            <Route path="/tags/:id/:slug" element={
              <PostsByTag posts={posts} tags={tags} categories={categories} users={users} getPostsMethod={getPostsByTag} setPageTitle={setPageTitle} setPageDescription={setPageDescription} />
            } />

            <Route element={<Navigate to="/" />} />
            {/* <Navigate to="/" /> */}

          </Routes>
        </>
      
        :

        <>
        </>
      
      }
      
    </>

  )
}