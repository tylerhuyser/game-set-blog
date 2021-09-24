import React from 'react'

import CommentCard from './CommentCard'


export default function Comments(props) {

  const { commentsData } = props

  console.log(commentsData)

  const COMMENTSJSX = commentsData.map((comment) => (
    <CommentCard commentData={comment} key={comment.id} />
  ))
  
  return (
    <>
      <div className="comments-container">

        {COMMENTSJSX}
        
      </div>
    </>
  )
}