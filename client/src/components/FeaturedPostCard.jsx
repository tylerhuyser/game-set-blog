import React from 'react'
import { useHistory } from 'react-router-dom'

import './FeaturedPostCard.css'

export default function FeaturedPostCard(props) {

  const { postData, users } = props

  const history = useHistory()
  const parse = require('html-react-parser').default

  const postDate = new Date(postData.date).getDate()
  const postMonth = new Date(postData.date).getMonth() + 1
  const postYear = new Date(postData.date).getFullYear()

  const handlePost = () => {
    localStorage.setItem('currentPost', JSON.stringify(postData))
    history.push(`/posts/${postData.id}/${postData.slug}`)
  }
  
  return (
  
    <>
    
      {postData && users ?

        <>

          <div className="featured-post-card-container" key={postData.id} onClick={handlePost} >

            <div className="featured-post-card-content-container">

              <div className='featured-post-card-header-container'>

                <p className="featured-post-card-title">{parse(postData.title.rendered).toUpperCase()}</p>
                <p className="featured-post-card-date">{`${postMonth}.${postDate}.${postYear}`}</p>
                
              </div>

              <div className='featured-post-card-excerpt-container'>

                <div className="featured-post-card-excerpt">{parse(postData.excerpt.rendered.slice(0, 250).slice(0, postData.excerpt.rendered.slice(0, 250).lastIndexOf(".")).trim("Continue reading").concat("", "."))}</div>

                <p onClick={handlePost} className="featured-post-card-link">Read Full Article...</p>

              </div>

            </div>

            <div className='featured-post-card-image-container'>

              <img className="featured-post-card-image" src={postData["_embedded"]["wp:featuredmedia"][0].source_url} alt="featured-postCard-image" />
  
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