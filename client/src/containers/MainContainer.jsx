import React, { useState } from "react";

import { Route, Switch } from "react-router-dom";
import Home from "../screens/Home";
import About from '../screens/About'
import PostDetail from '../screens/PostDetail'

export default function MainContainer(props) {
  
  const { posts, tags, categories, users } = props
  
  return (

    <>
      
      {posts && tags && categories && users ?
      
        <>
          <Switch>

            <Route exact path="/">
              <Home posts={posts} tags={tags} categories={categories} users={users} />
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/posts/:id/:slug">
              <PostDetail posts={posts} tags={tags} categories={categories} users={users} />
            </Route>

          </Switch>
        </>
      
        :

        <>
        </>
      
      }
      
    </>

  )
}