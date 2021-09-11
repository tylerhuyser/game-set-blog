import React, { useState, useEffect } from 'react'

import Layout from './components/shared/Layout'
import Loader from './components/shared/Loader'
import MainContainer from './containers/MainContainer'

import './App.css';

import {
  getPosts
} from './services/posts'

import {
  getTags
} from './services/tags'

import {
  getCategories
} from './services/categories'

function App() {

  const [loaded, setLoaded] = useState(false)

  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    const getPostsData = async () => {
      const postsData = await getPosts()
      setPosts(postsData)
    }
    getPostsData()
  }, [])

  useEffect(() => {
    const getTagsData = async () => {
      const tagsData = await getTags()
      setTags(tagsData)
    }
    getTagsData()
  }, [])

  useEffect(() => {
    const getCategoriesData = async () => {
      const categoriesData = await getCategories()
      setPosts(categoriesData)
    }
    getCategoriesData()
  }, [])

  useEffect(() => {
    if (posts.length > 0 && tags.length > 0 && categories.length > 0) {
      setLoaded(true)
    }
  }, [])

  return (
    <div className="app-container">

      {loaded ?
      
        <Layout>
          <MainContainer posts={posts} tags={tags} categories={categories} />
        </Layout>
    
      :
  
        <Loader />
        
      }

    </div>
  );
}

export default App;
