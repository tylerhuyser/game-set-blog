import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'


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

  const history = useHistory()
  const parse = require('html-react-parser').default

  useEffect(() => {
    if (!loaded) {
      setPostData(JSON.parse(localStorage.getItem('currentPost')))
    }
  }, [])

  useEffect(() => {
    if (postData.date && postData.author) {
      setPostInfo(prevState => ({
        ...prevState,
        postDate: new Date(postData.date).getDate(),
        postMonth: new Date(postData.date).getMonth(),
        postYear: new Date(postData.date).getFullYear(),
        postAuthor: users.find((user) => (user.id === postData.author))
      }))
    }
  }, [postData])

  useEffect(() => {
    if (postData && (postInfo.postDate !== "" && postInfo.postMonth !== "" && postInfo.postYear !== "" && postInfo.postAuthor !== "")) {
      setLoaded(true)
    }
  }, [postData])
  
  const handleReturn = () => {
    localStorage.removeItem('currentPost')
    history.push(`/posts`)
  }

  console.log(postData)
  
  return(
    <>
      
      {postData && postInfo.postAuthor && loaded ?

        <>
          
          <div className="post-container" key={postData.id} onClick={handleReturn} >

            <p className="post-title">{postData.title.rendered}</p>

            <div className="post-subtitle-container">

              <p className="post-author">{`Written by ${postInfo.postAuthor.name.split(".")[0].split("")[0].toUpperCase()}${postInfo.postAuthor.name.split(".")[0].split("").slice(1).join("").toLowerCase()} ${postInfo.postAuthor.name.split(".")[1].split("")[0].toUpperCase()}${postInfo.postAuthor.name.split(".")[1].split("").slice(1).join("").toLowerCase()}`}</p>

              <p className="post-date">{`${postInfo.postMonth}.${postInfo.postDate}.${postInfo.postYear}`}</p>

            </div>

            <p className="post-content">{parse(postData.content.rendered.toString().trim("Continue reading"))}</p>
            
          </div>

        </>

        :

        <>
        </>

      }
      
    </>
  )
}