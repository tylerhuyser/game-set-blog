import React from 'react'

export default function SidebarTags(props) {
  const { tags } = props

  const TAGSJSX = tags && tags?.map(tag => (
    <p className="sidebar-tag-name" key={tag.id}>{tag.name}</p>
  ))

  return (
    <div className="sidebar-tags-container">

      <p className="sidebar-tags-header">TAGS</p>

      {TAGSJSX}

    </div>
  )
}