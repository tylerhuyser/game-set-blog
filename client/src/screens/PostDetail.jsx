import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getPostBySlug } from '../services/posts'
import { getCommentsPerPost } from '../services/comments'

import LoaderLogo from '../components/shared/LoaderLogo'
import Categories from '../components/Categories'
import Tags from '../components/Tags'
import Comments from '../components/Comments'

import './PostDetail2.css'


export default function PostDetail(props) {

  const [loaded, setLoaded] = useState(false)
  const [postData, setPostData] = useState(null)
  const [postInfo, setPostInfo] = useState({
    postDate: "",
    postMonth: "",
    postYear: "",
  })
  const [comments, setComments ] = useState([])

  const parse = require('html-react-parser').default
  const params = useParams()

  useEffect(() => {

    const currentPostDataFromStorage = JSON.parse(localStorage.getItem('currentPost'))

    if (!loaded && currentPostDataFromStorage && (currentPostDataFromStorage.slug === params.slug)) {
      setPostData(currentPostDataFromStorage)
      console.log('PostDetail.jsx - UseeEffect #1a - postDATA set from LocalStorage')
      console.log(currentPostDataFromStorage.content.rendered)

    } else if (!loaded && (!currentPostDataFromStorage || (currentPostDataFromStorage.slug) !== params.slug)) {

      const gatherPostData = async (slug) => {
        const postDataFromWP = await getPostBySlug(slug)
        localStorage.setItem("currentPost", JSON.stringify(postDataFromWP))
        setPostData(postDataFromWP)
        console.log('PostDetail.jsx - UseEffect #1b - postDATA set from WP API')
      }

      gatherPostData(params.slug)
      
    }
  }, [])

  useEffect(() => {
    if (postData && postData.date) {
      setPostInfo(prevState => ({
        ...prevState,
        postDate: new Date(postData.date).getDate(),
        postMonth: new Date(postData.date).getMonth() + 1,
        postYear: new Date(postData.date).getFullYear(),
      }))
      console.log('PostDetail.jsx - UseeEffect #2 - postINFO set')
    }
  }, [postData])

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
    if (postData && (postInfo.postDate !== "" && postInfo.postMonth !== "" && postInfo.postYear !== "" && (comments.length > 0 || comments === "No Comments."))) {
      setLoaded(true)
      console.log('PostDetail.jsx - UseEffect #4 - PostDetail Loaded')
    }
  }, [postInfo, comments])
  
  return(
    <>
      
      {postData && postInfo.postDate !== "" && loaded ?

        <>
          
          <div className="post-container">

            <div className='post-hero-container'>
              
              <div className="post-image-container" id='post-hero-image-container'>

                <img className="post-image" id="post-hero-image" src={postData["_embedded"]["wp:featuredmedia"][0].source_url} atl="post-hero-image" />

              </div>

              <div className="post-hero-content-container">

                <p className="post-title">{parse(postData.title.rendered)}</p>

                <p className="post-date">{`${postInfo.postMonth}.${postInfo.postDate}.${postInfo.postYear}`}</p>

                <p className='post-hero-excerpt'>{parse(postData.excerpt.rendered.trim("Continue reading"))}</p>
  
              </div>

            </div>


            <div className="post-content-container">{parse(postData.content.rendered.toString().trim("Continue reading"))}</div>



            
            <div className='post-categories-container'>

              <p className="post-categories-tags-container-title" id="post-categories-container-title">CATEGORIES</p>

              <Categories postCategories={postData["_embedded"]["wp:term"][0]} />
              
            </div>

            <div className='post-tags-container'>

              <p className="post-categories-tags-container-title" id="post-tags-container-title">TAGS</p>
 
              <Tags postTags={postData["_embedded"]["wp:term"][1]} />
              
            </div>

            <Comments postData={postData} commentsData={comments} />
            
          </div>

        </>

        :

        <div className="post-container">

          <div className="post-loader-container">

            <div id="post-loader-wrapper">

              <LoaderLogo fill="white" stroke="white" />

            </div>
          
          </div>
        
        </div>

      }
      
    </>
  )
}