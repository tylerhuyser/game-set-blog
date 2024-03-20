import React, { useEffect } from 'react'

import Posts from '../components/Posts'

import {
  getPosts
} from '../services/posts'

import './PageNotFound.css'


export default function PageNotFound(props) {

  const { tags, categories, users } = props
  const { setPageTitle, setPageDescription } = props

  useEffect(() => {
    setPageTitle('Game, Set, Blog | Page Not Found')
    setPageDescription(`Game, Set, Blog | Page Not Found | Analysis and opinion on the world of tennis. Grand Slams, ATP, WTA, and ITF. After Google Search informed me that I visited Simona Halep's Wikipedia page 57 times in the past month, I finally decided to admit I have a problem. This blog is the solution.`)
  }, [])
   
  return(
    <div className="page-not-found-container">

      <p className="page-not-found-title">{`Sorry, the page you requested cannot be found.`}</p>
      
      <Posts tags={tags} users={users} categories={categories} getPostsMethod={getPosts} sourceID={null} />   
      
    </div>
  )
}