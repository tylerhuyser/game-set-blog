import React, { useState, useEffect } from 'react'

import LoaderLogo from './shared/LoaderLogo'
import PostCard from './PostCard'
import GetPostsInfinite from '../services/GetPostsInfinte'
import './Posts.css'


export default function Posts(props) {

  const { users, categories, tags, getPostsMethod, sourceID } = props
  const [pageToLoad, setPageToLoad] = useState(2)
  const [pageQueued, setPageQueued] = useState(false)

  const { posts, hasMore, loading } = GetPostsInfinite({ pageToLoad, getPostsMethod, sourceID, pageQueued })

  useEffect(() => {
    if (sourceID) {
      setPageToLoad(1)
      setPageQueued(true)
    }
    else if (!sourceID) setPageQueued(true)
  }, [sourceID])
  
  return(
    <>
      
        <div className="post-cards-container">
      
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
                  key={post.id}
                />
              )
            }
          )}

          {loading ?
            
            <>
            
              <div className="infinite-scroll-loader">
          
                <LoaderLogo fill="#f39c12" stroke="#f39c12" />
    
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