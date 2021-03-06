import React, {useCallback, useRef} from 'react'
import { useHistory } from 'react-router-dom'

import './PostCard.css'

export default function PostCard (props) {

  const { index, totalPosts, postData, users, setPageToLoad, loading, hasMore } = props

  const history = useHistory()
  const parse = require('html-react-parser').default

  const postDate = new Date(postData.date).getDate()
  const postMonth = new Date(postData.date).getMonth() + 1
  const postYear = new Date(postData.date).getFullYear()

  const observer = useRef()
  const lastPostElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageToLoad(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const handlePost = () => {
    localStorage.setItem('currentPost', JSON.stringify(postData))
    history.push(`/posts/${postData.id}/${postData.slug}`)
  }
  
  return (
  
    <>
    
      {postData && users ?

        <>
          <div className="postCard-container" ref={index + 1 === totalPosts ? lastPostElementRef : null} key={postData.id} onClick={handlePost} >

            <div className="postCard-image-container" key={postData.id}>
              <a>
                <img className="postCard-img" src={postData["_embedded"]["wp:featuredmedia"][0].source_url} />
              </a>
            </div>

            <div className="postCard-content">

              <p className="postCard-date">{`${postMonth}.${postDate}.${postYear}`}</p>

              <p className="postCard-title">{parse(postData.title.rendered).toUpperCase()}</p>

            </div>
            
          </div>

        </>
      
        :
        
        <>
        </>

      }

    </>
  )
}