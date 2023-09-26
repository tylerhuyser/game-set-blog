import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Tags(props) {
  
  const { postTags } = props

  const history = useHistory()

  const handleTag = (tag) => {
    localStorage.setItem('currentTag', JSON.stringify(tag))
    history.push(`/tags/${tag.id}/${tag.slug}`)
  }
  
  const TAGSJSX = postTags && postTags?.map((tag, index) => (
    <p className="post-tag-copy" onClick={(e) => handleTag(tag)} key={tag.id}>{tag.name.replace('&amp ;', "&")}</p>
  ))

  return (
    <div className="tags-container">
      {TAGSJSX}
    </div>
  )
}