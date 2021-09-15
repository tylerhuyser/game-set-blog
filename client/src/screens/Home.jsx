import React from 'react'

import Posts from '../components/Posts'
import PostCard from '../components/PostCard'

export default function Home (props) {
  
  const { posts, tags, categories } = props

  console.log(posts)

  const POSTCARDSJSX = posts && posts?.slice(0, 5).map((post) => {
    
    console.log(post)
    
    return(
      < PostCard postData = { post } />
  )})

  return (

    <>
      {POSTCARDSJSX}
    </>
  )
}