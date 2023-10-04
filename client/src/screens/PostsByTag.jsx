import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getPostsByTag } from '../services/posts'
import Posts from '../components/Posts'
import LoaderLogo from '../components/shared/LoaderLogo'

import "./PostsByTag.css"

export default function PostsByTag(props) {

  const { tags, categories, users } = props
  
  const [posts, setPosts] = useState([])
  const [loaded, setLoaded] = useState(false)

  const params = useParams()

  useEffect(() => {

    const gatherPostByTag = async (tagID, page) => {
      const postsData = await getPostsByTag(tagID, page)
      console.log("PostsByTag.js - UseEffect #1 - Gathering Posts-By-Tag")
      if (postsData.data.length > 0) {
        setPosts(postsData.data)
      } else if (postsData.data.length === 0) {
        setPosts("No Posts.")
      }
    }

    gatherPostByTag(params.id, 1)
    
  }, [])

  useEffect(() => {
    if (posts && (posts.length > 0 || posts === "No Posts.")) {
      setLoaded(true)
    }
  }, [posts])


  return (
  
    <>
      
      {loaded && (posts.length > 0 || posts === "No Posts.") ?
        
        <div className="posts-by-tag-container">

          {posts === "No Posts." ?
            
            <>
              
              <p className="posts-by-tag-title">{`There are 0 posts tagged with ${params.slug.split("-").join(" ")}.`}</p>

            </>
            

            :
          
            <>
              
              <p className="posts-by-tag-title">{`Posts tagged with: ${params.slug.split("-").map((word) => {return word[0].toUpperCase() + word.substring(1)}).join(" ")}`}</p>

              <Posts tags={tags} users={users} categories={categories} getPostsMethod={getPostsByTag} sourceID={params.id} />

            </>
          
          }

        </div>

        :
      
        <div className="posts-by-tag-container">

            <div className="posts-by-tag-loader-container">

              <div id="posts-by-tag-loader-wrapper">

                <LoaderLogo fill="white" stroke="white" />

              </div>

            </div>
      
        </div>

      }
      
    </>
  )
}