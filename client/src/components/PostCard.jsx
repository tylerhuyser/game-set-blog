import React from 'react'
import { useHistory } from 'react-router-dom'

import './PostCard.css'

export default function PostCard(props) {

  const { postData, users, key } = props

  const history = useHistory()
  const parse = require('html-react-parser').default

  const postDate = new Date(postData.date).getDate()
  const postMonth = new Date(postData.date).getMonth()
  const postYear = new Date(postData.date).getFullYear()

  const postAuthor = users.find((user) => (user.id === postData.author))

  console.log(postData)

  const handlePost = () => {
    localStorage.setItem('currentPost', JSON.stringify(postData))
    history.push(`/posts/${postData.slug}`)
  }
  
  return(
    <>
      <div className="postCard-container" key={key} onClick={handlePost} >

        <p className="post-title">{postData.title.rendered}</p>

        <div className="postCard-subtitle-container">

          <p className="post-author">{`Written by ${postAuthor.name.split(".")[0].split("")[0].toUpperCase()}${postAuthor.name.split(".")[0].split("").slice(1).join("").toLowerCase()} ${postAuthor.name.split(".")[1].split("")[0].toUpperCase()}${postAuthor.name.split(".")[1].split("").slice(1).join("").toLowerCase()}`}</p>

          <p className="post-date">{`${postMonth}.${postDate}.${postYear}`}</p>

        </div>

        <p className="post-exerpt">{parse(postData.excerpt.rendered.toString())}</p>

        <p onClick={handlePost}>Read Full Article...</p>
        
      </div>
    </>
  )
}