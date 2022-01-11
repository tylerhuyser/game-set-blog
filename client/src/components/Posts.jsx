import React, { useState, useRef, useCallback } from 'react'
import GetPostsInfinite from '../services/GetPostsInfinte'

import PostCard from './PostCard'


export default function Posts(props) {

  const { users, categories, tags } = props
  const [pageToLoad, setPageToLoad] = useState(2)

  const { posts, hasMore, loading } = GetPostsInfinite({ pageToLoad })



  // const POSTCARDSJSX = posts & posts?.map((post, index) => {
  //   if (posts === index + 1) {
  //     return (
  //       <PostCard ref={lastPostElementRef} postData={post} users={users} key={post.id} index={index} />
  //     )
  //   } else {
  //     return (
  //       <PostCard postData={post} users={users} key={post.id} index={index} />
  //     )
  //   }
  // })

  console.log(posts)
  
  return(
    <>
      {posts.length < 5 ?
    
        <p> Loading </p>
        
        :
      
        <>
      
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return (
                <PostCard
                  index={index}
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
            } else {
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
          })}
          
        </>
      
      }
    </>
  )
}