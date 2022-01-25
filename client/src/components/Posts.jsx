import React, { useState, useEffect } from 'react'

import LoaderLogo from './shared/LoaderLogo'
import PostCard from './PostCard'
import GetPostsInfinite from '../services/GetPostsInfinte'
import './Posts.css'


export default function Posts(props) {

  const { users, categories, tags, getPostsMethod, sourceID } = props
  const [pageToLoad, setPageToLoad] = useState(2)

  const { posts, hasMore, loading } = GetPostsInfinite({ pageToLoad, getPostsMethod, sourceID })

  useEffect(() => {
    if (sourceID) setPageToLoad(1)
  })

  console.log(posts)
  
  return(
    <>
      {/* {posts.length < 5 ?
    
          <>
                  
            <div className="infinite-scroll-loader">
          
              <LoaderLogo />

            </div>
          
        </>
        
        : */}
      
        <div className="postCards-container">
      
          {posts.map((post, index) => {
              return (
                <PostCard index={index}
                  totalPosts={posts.length}
                  postData={post}
                  users={users}
                  categories={categories}
                  tags={tags}
                  pageToLoad={pageToLoad}
                  setPageToLoad={setPageToLoad}
                  loading={loading}
                  hasMore={hasMore}
                />
              )
            }
          )}

          {loading ?
            
            <>
            
              <div className="infinite-scroll-loader">
          
                <LoaderLogo />
    
              </div>
              
            </>

            :

            <></>
          }

        </div>
      
      {/* } */}
    </>
  )
}