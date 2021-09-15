import React from 'react'


export default function PostCard(props) {

  const { postData } = props

  console.log(postData)
  
  return(
    <>
      <div className="post-card-container">

        <p className="post-title">{postData.title.rendered}</p>
        
      </div>
    </>
  )
}