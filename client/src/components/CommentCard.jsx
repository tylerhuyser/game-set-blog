import React from 'react'

import "./CommentCard.css"

export default function CommentCard(props) {

  const { commentData } = props
  const parse = require('html-react-parser').default

  console.log(commentData)

  const commentDate = new Date(commentData.date).getDate()
  const commentMonth = new Date(commentData.date).getMonth()
  const commentYear = new Date(commentData.date).getFullYear()
  
  return (

    <>
      
      {commentData ?

        <div className="comment-card-container" key={commentData.id}>

          <div className="comment-card-header-container">

            <p className="comment-author-name">{commentData.author_name}</p>

            <p className="comment-date">{`${commentDate}.${commentMonth}.${commentYear}`}</p>
            
          </div>

          <div className="comment-content">{parse(commentData.content.rendered.toString())}</div>

        </div>
        
      :
        
        <>
        </>

      }

    </>
  )
}