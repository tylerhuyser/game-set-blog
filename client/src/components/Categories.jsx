import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Categories(props) {
  
  const { postCategories } = props

  const navigate = useNavigate()

  const handleCategory = (category) => {
    localStorage.setItem('currentCategory', JSON.stringify(category))
    navigate(`/categories/${category.id}/${category.slug}`)
  }
  
  const CATEGORIESJSX = postCategories && postCategories?.map((category, index) => (
    <p className="post-category-copy" onClick={(e) => handleCategory(category)} key={category.id}>{category.name.replace('&amp;', "&")}</p>
  ))

  return (
    <div className="categories-container">
      {CATEGORIESJSX}
    </div>
  )
}