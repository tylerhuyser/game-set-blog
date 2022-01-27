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

          <div className="comment-card-hero-container">

            <i className="far fa-user"></i>

            <div className="comment-card-header-container">

              {/* <div className="comment-profile-image-container"> */}
                {/* <i className="far fa-user"></i> */}
              {/* </div> */}

              <p className="comment-author-name">{commentData.author_name}</p>

              <p className="comment-date">{`${commentDate}.${commentMonth}.${commentYear}`}</p>
              
              </div>
            
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