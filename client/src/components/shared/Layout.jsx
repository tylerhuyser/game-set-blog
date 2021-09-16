import React from 'react'

import Header from '../shared/Header'
import Sidebar from '../shared/Sidebar'
import Footer from '../shared/Footer'

import './Layout.css'


export default function Layout(props) {

  const { categories, tags } = props
  
  return(
    <>
      
      <div className="layout-container">

        <Header
        />

        <div className="body-container">

          {props.children}

          <Sidebar categories={categories} tags={tags} />

        </div>

        <Footer />

      </div>
      
    </>
  )
}

