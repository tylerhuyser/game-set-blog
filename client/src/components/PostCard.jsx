import React, {useCallback, useRef} from 'react'
import { useHistory } from 'react-router-dom'

import './PostCard.css'

export default function PostCard (props) {

  const { index, totalPosts, postData, users, categories, tags, pageToLoad, setPageToLoad, loading, hasMore } = props

  const history = useHistory()
  const parse = require('html-react-parser').default

  const postDate = new Date(postData.date).getDate()
  const postMonth = new Date(postData.date).getMonth()
  const postYear = new Date(postData.date).getFullYear()

  const postAuthor = users.find((user) => (user.id === postData.author))

  const observer = useRef()
  const lastPostElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      console.log("hurr")
      if (entries[0].isIntersecting && hasMore) {
        console.log('HERE!')
        setPageToLoad(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const handlePost = () => {
    localStorage.setItem('currentPost', JSON.stringify(postData))
    history.push(`/posts/${postData.slug}`)
  }
  
  return (
  
    <>
    
      {postData && users ?

        <>
          <div className="postCard-container" ref={index + 1 === totalPosts ? lastPostElementRef : null} key={postData.id} onClick={handlePost} >

            <div className="postCard-image" key={postData.id}>
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