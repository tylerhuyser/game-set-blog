import React, { useState } from "react";

import { Route, Switch } from "react-router-dom";
import Home from "../screens/Home";
import About from '../screens/About'
import PostDetail from '../screens/PostDetail'

export default function MainContainer(props) {
  
  const { posts, tags, categories } = props
  
  return (

    <>
      <Switch>

        <Route exact path="/">
          <Home posts={posts} tags={tags} categories={categories} />
        </Route>

        <Route path="about">
          <About />
        </Route>

        <Route path="post/:slug">
          <PostDetail posts={posts} tags={tags} categories={categories} />
        </Route>

      </Switch>
    </>

  )
}