import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getPostBySlug } from '../services/posts'
import { getCommentsPerPost } from '../services/comments'

import LoaderLogo from '../components/shared/LoaderLogo'
import Categories from '../components/Categories'
import Tags from '../components/Tags'
import Comments from '../components/Comments'

import './PostDetail.css'


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
          
          <div className="postDetail-container">

            <div className="postDetail-hero-container">

              <div className="postDetail-hero-image-container" key={postData.id}>
                <a>
                  <img className="postDetail-hero-img" src={postData["_embedded"]["wp:featuredmedia"][0].source_url} atl="postDetail-hero-image" />
                </a>
              </div>

              <div className="postDetail-hero-content-container">

                <p className="postDetail-date">{`${postInfo.postMonth}.${postInfo.postDate}.${postInfo.postYear}`}</p>

                <p className="postDetail-title">{parse(postData.title.rendered)}</p>
                
              </div>

            </div>

            <div className="postDetail-categories-tags-container">

              <p className="postDetail-categories-tags-container-title">CATEGORIES</p>

              <Categories postCategories={postData["_embedded"]["wp:term"][0]} />

              <p className="postDetail-categories-tags-container-title">TAGS</p>

              <Tags postTags={postData["_embedded"]["wp:term"][1]} />

            </div>

            <div className="postDetail-content-container">{parse(postData.content.rendered.toString().trim("Continue reading"))}</div>

            <Comments postData={postData} commentsData={comments} />
            
          </div>

        </>

        :

        <div className="postDetail-container">

          <div className="postDetail-loader-container">

            <div id="postDetail-loader-wrapper">

              <LoaderLogo fill="white" stroke="white" />

            </div>
          
          </div>
        
        </div>

      }
      
    </>
  )
}