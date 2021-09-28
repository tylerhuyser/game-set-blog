import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { getCommentsPerPost } from '../services/comments'
import Comments from '../components/Comments'


export default function PostDetail(props) {

  const {posts, users, tags, categories } = props

  const [loaded, setLoaded] = useState(false)
  const [postData, setPostData] = useState(null)
  const [postInfo, setPostInfo] = useState({
    postDate: "",
    postMonth: "",
    postYear: "",
    postAuthor: ""
  })
  const [comments, setComments ] = useState([])

  const history = useHistory()
  const parse = require('html-react-parser').default

  useEffect(() => {
    if (!loaded) {
      setPostData(JSON.parse(localStorage.getItem('currentPost')))
      console.log('PostDetail.jsx - UseeEffect #1 - postDATA set from LocalStorage')
    }
  }, [])

  useEffect(() => {
    if (postData && postData.date && postData.author && users.length > 0) {
      setPostInfo(prevState => ({
        ...prevState,
        postDate: new Date(postData.date).getDate(),
        postMonth: new Date(postData.date).getMonth(),
        postYear: new Date(postData.date).getFullYear(),
        postAuthor: users.find((user) => (user.id === postData.author))
      }))
      console.log('PostDetail.jsx - UseeEffect #2 - postINFO set')
    }
  }, [postData, users])

  useEffect(() => {
    if (postData && postData.id) {

      const gatherComments = async (postID) => {
        const commentsData = await getCommentsPerPost(postID)
        console.log('PostDetail.js - UseEffect #3 - COMMENTS below')
        console.log(commentsData)
        if (commentsData.length > 0) {
          setComments(commentsData)
        } else if (commentsData.length === 0) {
          setComments("No Comments.")
        }
      }

      gatherComments(postData.id)
    }
  }, [postData])

  useEffect(() => {
    if (postData && (postInfo.postDate !== "" && postInfo.postMonth !== "" && postInfo.postYear !== "" && postInfo.postAuthor !== "" && (comments.length > 0 || comments === "No Comments."))) {
      setLoaded(true)
      console.log('PostDetail.jsx - UseEffect #4 - PostDetail Loaded')
    }
  }, [postInfo, comments])
  
  const handleReturn = () => {
    localStorage.removeItem('currentPost')
    history.push(`/`)
  }

  console.log(postData)
  
  return(
    <>
      
      {postData && users && postInfo.postAuthor !== "" && loaded ?

        <>
          
          <div className="post-container" key={postData.id} >

            <p className="post-title">{parse(postData.title.rendered)}</p>

            <div className="post-subtitle-container">

              <p className="post-author">{`Written by ${postInfo.postAuthor.name.split(".")[0].split("")[0].toUpperCase()}${postInfo.postAuthor.name.split(".")[0].split("").slice(1).join("").toLowerCase()} ${postInfo.postAuthor.name.split(".")[1].split("")[0].toUpperCase()}${postInfo.postAuthor.name.split(".")[1].split("").slice(1).join("").toLowerCase()}`}</p>

              <p className="post-date">{`${postInfo.postMonth}.${postInfo.postDate}.${postInfo.postYear}`}</p>

            </div>

            <div className="post-content">{parse(postData.content.rendered.toString().trim("Continue reading"))}</div>

            <Comments postData={postData} commentsData={comments} />
            
          </div>

        </>

        :

        <>
        </>

      }
      
    </>
  )
}