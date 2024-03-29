import React, { useState, useEffect } from 'react'

import Layout from './components/shared/Layout'
import Loader from './components/shared/Loader'
import MainContainer from './containers/MainContainer'

import { getPosts } from './services/posts'
import { getTags } from './services/tags'
import { getCategories } from './services/categories'
import { getUsers } from './services/users'

import './App.css';

function App() {

  // Loading Triggers
  const [loaded, setLoaded] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Data
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const [users, setUsers] = useState([])

  // MetaData
  const [pageTitle, setPageTitle] = useState("")
  const [pageDescription, setPageDescription] = useState("")

  const location = window.location

  const isHome = location.pathname === '/';
  
  useEffect(() => {
    const getPostsData = async (sourceID, page) => {
      const postsData = await getPosts(sourceID, page)
      console.log('App.jsx - UseEffect # 1 - POSTS below')
      console.log(postsData)
      setPosts(postsData.data)
    }
    getPostsData(null, 1)
  }, [])

  useEffect(() => {
    const getTagsData = async () => {
      const tagsData = await getTags()
      console.log('App.jsx - UseEffect #2 - TAGS below')
      setTags(tagsData)
    }
    getTagsData()
  }, [])

  useEffect(() => {
    const getCategoriesData = async () => {
      const categoriesData = await getCategories()
      console.log('App.jsx - UseEffect #3 - CATEGORIES below')
      console.log(categoriesData)
      setCategories(categoriesData)
    }
    getCategoriesData()
  }, [])

  useEffect(() => {
    const getUsersData = async () => {
      const usersData = await getUsers()
      console.log('App.js - UseEffect #4 - USERS below')
      setUsers(usersData)
    }
    getUsersData()
  }, [])

  useEffect(() => {
    if (posts.length > 0 && tags.length > 0 && categories.length > 0 && users.length > 0) {
      console.log('App.jsx - UseEffect #5 - App.js LOADED')
      setLoaded(true)
    }
  }, [posts, tags, categories, users])

  return (
    <div className="app-container">

      {loaded && isMounted ?
      
        <Layout isMounted={isMounted} isHome={isHome} title={pageTitle} description={pageDescription} >

          <MainContainer posts={posts} tags={tags} categories={categories} users={users} setPageTitle={setPageTitle} setPageDescription={setPageDescription} />

        </Layout>
    
      :
  
        <Loader finishLoading={() => setIsMounted(true)} id="app-loader" />
          
      }

    </div>
  );
}

export default App;
