import React from 'react'

import Posts from '../components/Posts'
import PostCard from '../components/PostCard'

export default function Home (props) {
  
  const { posts, tags, categories } = props

  const POSTCARDSJSX = posts && posts?.slice(0, 5).map((post) => (
    <PostCard postData={post} />
  ))

  return (

    <>
      {POSTCARDSJSX}
    </>
  )
}