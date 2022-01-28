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
          <div className="featuredPostCard-container" key={postData.id} onClick={handlePost} >

            <div className="post-content">

                <p className="post-date">{`${postMonth}.${postDate}.${postYear}`}</p>

                <p className="post-title">{parse(postData.title.rendered).toUpperCase()}</p>

              <div className="post-excerpt">{parse(postData.excerpt.rendered.slice(0, 250).slice(0, postData.excerpt.rendered.slice(0, 250).lastIndexOf(".")).trim("Continue reading").concat("", "."))}</div>

              <p onClick={handlePost} className="post-link">Read Full Article...</p>

            </div>

            <div className="post-image">
              <a href="">
                  <img className="img" src={postData["_embedded"]["wp:featuredmedia"][0].source_url} alt="featured-postCard-image" />
                  {/* <Img fluid={postData["_embedded"]["wp:featuredmedia"][0].source_url} alt={parse(postData.title.rendered)} className="img"/> */}
              </a>
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