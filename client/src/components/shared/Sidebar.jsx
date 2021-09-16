import React from 'react'
import { Link } from 'react-router-dom';

import TwitterTimeline from '../TwitterTimeline'
import SidebarCategories from '../SidebarCategories'
import SidebarTags from '../SidebarTags'

import './Sidebar.css'


export default function Sidebar(props) {

  const { categories, tags } = props
  
  return(
    <>
      <div className="sidebar-container">

        <TwitterTimeline />

        <SidebarCategories categories={categories} />

        <SidebarTags tags={tags} />

        
      </div>
    </>
  )
}