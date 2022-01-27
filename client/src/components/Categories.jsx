import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Categories(props) {
  
  const { postCategories } = props

  const history = useHistory()

  const handleCategory = (category) => {
    localStorage.setItem('currentCategory', JSON.stringify(category))
    history.push(`/categories/${category.id}/${category.slug}`)
  }
  
  const CATEGORIESJSX = postCategories && postCategories?.map((category, index) => (
    <p className="postDetail-category" onClick={(e) => handleCategory(category)} key={category.id}>{category.name.replace('&amp;', "&")}</p>
  ))

  return (
    <div className="categories-container">
      {CATEGORIESJSX}
    </div>
  )
}