import React from 'react'

import FeaturedPostCard from '../components/FeaturedPostCard'
import Posts from '../components/Posts'

import {
  getPosts
} from '../services/posts'

import './Home.css'

export default function Home (props) {
  
  const { posts, tags, categories, users } = props

  const FEATUREDPOSTCARDSJSX = posts && posts?.slice(0, 5).map((post) => {
    
    return(
      <FeaturedPostCard postData = { post } users={users} key={post.id} />
  )})

  return (

    <>
      
      {posts && posts.length > 0 ?
      
        <div className="home-container">

          {FEATUREDPOSTCARDSJSX[0]}

          <p className='home-page-copy posts-title' id="featured-posts-title">FEATURED POSTS</p>

          {FEATUREDPOSTCARDSJSX.slice(1)}
          
          <p className='home-page-copy posts-title' id="latest-posts-title">LATEST POSTS</p>

          <Posts tags={tags} users={users} categories={categories} getPostsMethod={getPosts} sourceID={null} />

        </div>
        
        :
        
        <div className="home-container"></div>
      
      }

    </>
  )
}