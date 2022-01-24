import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { getPost, getPostBySlug } from '../services/posts'
import { getCommentsPerPost } from '../services/comments'

import LoaderLogo from '../components/shared/LoaderLogo'
import Tags from '../components/Tags'
import Comments from '../components/Comments'

import './PostDetail.css'


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
  const params = useParams()

  console.log(params)

  useEffect(() => {

    const currentPostDataFromStorage = JSON.parse(localStorage.getItem('currentPost'))

    if (!loaded && currentPostDataFromStorage && (currentPostDataFromStorage.slug === params.slug)) {
      setPostData(currentPostDataFromStorage)
      console.log('PostDetail.jsx - UseeEffect #1a - postDATA set from LocalStorage')

    } else if (!loaded && (!currentPostDataFromStorage || (currentPostDataFromStorage.slug) !== params.slug)) {

      const gatherPostData = async (slug) => {
        const postDataFromWP = await getPostBySlug(slug)
        localStorage.setItem("currentPost", JSON.stringify(postDataFromWP))
        setPostData(postDataFromWP)
        console.log('PostDetail.jsx - UseeEffect #1b - postDATA set from WP API')
      }

      gatherPostData(params.slug)
      
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
          
          <div className="postDetail-container">

            <div className="postDetail-hero-container">

              <div className="postDetail-hero-image-container" key={postData.id}>
                <a>
                  <img className="postDetail-hero-img" src={postData["_embedded"]["wp:featuredmedia"][0].source_url} />
                </a>
              </div>

              <div className="postDetail-hero-content-container">

                <p className="postDetail-date">{`${postInfo.postMonth}.${postInfo.postDate}.${postInfo.postYear}`}</p>

                <p className="postDetail-title">{parse(postData.title.rendered)}</p>
              
                <Tags postTags={postData["_embedded"]["wp:term"][1]} />
                
              </div>

            </div>

            <div className="postDetail-content-container">{parse(postData.content.rendered.toString().trim("Continue reading"))}</div>

            <Comments postData={postData} commentsData={comments} />
            
          </div>

        </>

        :

        <div className="postDetail-container">

          <div className="postDetail-loader-container">

            <div id="postDetail-loader-wrapper">

              <LoaderLogo />

            </div>
          
          </div>
        
        </div>

      }
      
    </>
  )
}