import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getPostsByCategory } from '../services/posts'
import Posts from '../components/Posts'

import "./PostsByCategory.css"

export default function PostsByCategory(props) {

  const { tags, categories, users } = props
  
  const [posts, setPosts] = useState([])
  const [totalPostsPages, setTotalPostsPages] = useState(1)
  const [loaded, setLoaded] = useState(false)

  const params = useParams()

  useEffect(() => {

    const gatherPostByCategory = async (categoryID, page) => {
      const postsData = await getPostsByCategory(categoryID, page)
      console.log(postsData)
      if (postsData.data.length > 0) {
        setTotalPostsPages(parseInt(postsData.headers['x-wp-totalpages'].trim('"')))
        setPosts(postsData.data)
      } else if (postsData.data.length === 0) {
        setTotalPostsPages(parseInt(postsData.headers['x-wp-totalpages'].trim('"')))
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
        
        <div className="postsByCategory-container">

          {posts === "No Posts." ?
            
            <>
              
              <p className="postsByCategory-title">{`There are 0 posts categorized as ${params.slug.split("-").join(" ")}.`}</p>

            </>
            

            :
          
            <>
              
              <p className="postsByCategory-title">{`Posts categorized as: ${params.slug.split("-").join(" ")}.`}</p>

              <Posts tags={tags} users={users} categories={categories} getPostsMethod={getPostsByCategory} sourceID={params.id} />

            </>
          
          }

        </div>

        :
      
        <>
        </>

      }
      
    </>
  )
}