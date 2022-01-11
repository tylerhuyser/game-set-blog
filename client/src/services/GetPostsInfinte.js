import React, { useState, useEffect, useRef } from 'react'
import { getPosts } from './posts'

export default function GetPostsInfinite (props) {

  const { pageToLoad } = props

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)

  // const initialPageLoad = useRef(false)

  const loadPosts = async function () {
    const postsData = await getPosts(pageToLoad)
    console.log(postsData)
    console.log(postsData.data)
    setPosts(prevPosts => {
      console.log(prevPosts)
      return [...prevPosts, ...postsData.data]
    })
    setHasMore(parseInt(postsData.headers['x-wp-totalpages'].trim('"')) > pageToLoad)
    setLoading(false)
  }

  useEffect(() => {
    // if (initialPageLoad.current) {
    //   return
    // }
    setLoading(true)
    loadPosts()
    // initialPageLoad.current = true
  }, [pageToLoad])

  return {
    posts,
    loading,
    hasMore
  }
}