import React from 'react'
import { Link } from 'react-router-dom';

import TwitterTimeline from '../TwitterTimeline'

import './Sidebar.css'


export default function Sidebar() {
  
  return(
    <>
      <div className="sidebar-container">

        <TwitterTimeline />
        
      </div>
    </>
  )
}