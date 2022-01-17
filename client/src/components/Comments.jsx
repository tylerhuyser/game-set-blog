import React from 'react'

import CommentForm from './CommentForm'
import CommentCard from './CommentCard'

import './Comments.css'


export default function Comments(props) {

  const { postData, commentsData } = props

  console.log(commentsData)

  const COMMENTSJSX = commentsData && commentsData.map((comment) => (
    <CommentCard commentData={comment} key={comment.id} />
  ))
  
  return (
    <>
      
      {postData && commentsData ?
        
        <div className="comments-container">

          <CommentForm postData={postData} />

          {COMMENTSJSX}
        
        </div>
        
        :
        
        <>
        </>
      }

    </>
  )
}