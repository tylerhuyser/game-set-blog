import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getPostsByCategory } from '../services/posts'
import Posts from '../components/Posts'
import LoaderLogo from '../components/shared/LoaderLogo'

import "./PostsByCategory2.css"

export default function PostsByCategory(props) {

  const { tags, categories, users } = props
  
  const [posts, setPosts] = useState([])
  const [loaded, setLoaded] = useState(false)

  const params = useParams()

  useEffect(() => {

    const gatherPostByCategory = async (categoryID, page) => {
      const postsData = await getPostsByCategory(categoryID, page)
      console.log("PostsByCategory.js - UseEffect #1 - Gathering Posts-By-Category")
      if (postsData.data.length > 0) {
        setPosts(postsData.data)
      } else if (postsData.data.length === 0) {
        setPosts("No Posts.")
      }
    }

    gatherPostByCategory(params.id, 1)
    
  }, [])

  useEffect(() => {
    if (posts && (posts.length > 0 || posts === "No Posts.")) {
      setLoaded(true)
    }
  }, [posts])

  return (
  
    <>
      
      {loaded && (posts.length > 0 || posts === "No Posts.") ?
        
        <div className="posts-by-category-container">

          {posts === "No Posts." ?
            
            <>
              
              <p className="posts-by-category-title">{`There are 0 posts categorized as ${params.slug.split("-").join(" ")}.`}</p>

            </>
            

            :
          
            <>
              
              <p className="posts-by-category-title">{`Posts categorized as: ${params.slug.split("-").map((word) => {return word[0].toUpperCase() + word.substring(1)}).join(" ")}.`}</p>

              <Posts tags={tags} users={users} categories={categories} getPostsMethod={getPostsByCategory} sourceID={params.id} />

            </>
          
          }

        </div>

        :
      
        <div className="posts-by-category-container">

          <div className="posts-by-category-loader-container">

            <div id="posts-by-category-loader-wrapper">

              <LoaderLogo fill="white" stroke="white" />

            </div>
          
          </div>
      
      </div>

      }
      
    </>
  )
}