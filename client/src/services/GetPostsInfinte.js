import React, { useState, useEffect } from 'react'
import { getPosts } from './posts'

export default function GetPostsInfinite (props) {

  const { pageToLoad, getPostsMethod, sourceID } = props

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)

  const loadPosts = async function (sourceID, pageToLoad) {
    const postsData = await getPostsMethod(sourceID, pageToLoad)
    console.log(`GetPostsInfinite.js - UseEffect #1 - Gathering Posts via Infinte Scroll - Page ${pageToLoad}`)
    setPosts(prevPosts => {
      return [...prevPosts, ...postsData.data]
    })
    setHasMore(parseInt(postsData.headers['x-wp-totalpages'].trim('"')) > pageToLoad)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    loadPosts(sourceID, pageToLoad)
  }, [pageToLoad])

  return {
    posts,
    loading,
    hasMore
  }
}