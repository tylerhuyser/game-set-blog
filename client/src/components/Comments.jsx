import React from 'react'


export default function Comments(props) {

  const { commentsData } = props

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