import React from 'react'

export default function SidebarCategories(props) {

  const { categories } = props

  const CATEGORIESJSX = categories && categories?.map(category => (
    <p className="sidebar-category-name" key={category.id}>{category.name}</p>
  ))

  return (

    <div className="sidebar-categories-container">

      <p className="sidebar-categories-header">CATEGORIES</p>

      {CATEGORIESJSX}

    </div>
  )
}