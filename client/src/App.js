import React, { useState, useEffect } from 'react'

import Layout from './components/shared/Layout'
import Loader from './components/shared/Loader'
import MainContainer from './containers/MainContainer'

import './App.css';

import { getPosts } from './services/posts'

import { getTags } from './services/tags'

import { getCategories } from './services/categories'

import { getUsers } from './services/users'

function App() {

  const [loaded, setLoaded] = useState(true)

  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    const getPostsData = async () => {
      const postsData = await getPosts()
      console.log(postsData)
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
      setCategories(categoriesData)
    }
    getCategoriesData()
  }, [])

  useEffect(() => {
    const getUsersData = async () => {
      const usersData = await getUsers()
      console.log(users)
      setUsers(usersData)
    }
    getUsersData()
  }, [])

  useEffect(() => {
    if (posts.length > 0 && tags.length > 0 && categories.length > 0 && users.length > 0) {
      setLoaded(true)
    }
  }, [])

  return (
    <div className="app-container">

      {loaded ?
      
        <Layout tags={tags} categories={categories}>
          <MainContainer posts={posts} tags={tags} categories={categories} users={users} />
        </Layout>
    
      :
  
        <Loader />
        
      }

    </div>
  );
}

export default App;
