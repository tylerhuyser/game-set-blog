import React from 'react'

import CommentForm from './CommentForm'
import CommentCard from './CommentCard'

// import './Comments.css'


export default function Comments(props) {

  const { postData, commentsData } = props
  
  return (
    <>
      
      {postData && commentsData ?
        
        <div className="comments-container">

          <CommentForm postData={postData} />

          {commentsData && commentsData !== "No Comments." ?

            commentsData && commentsData.map((comment) => (
              <CommentCard commentData={comment} key={comment.id} />
            ))
            
            :

            <></>
          
          }
        
        </div>
        
        :
        
        <>
        </>
      }

    </>
  )
}