import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../screens/Home";
import About from '../screens/About'
import PostDetail from '../screens/PostDetail'
import PostsByCategory from '../screens/PostsByCategory'
import PostsByTag from '../screens/PostsByTag'

import {
  getPostsByCategory,
  getPostsByTag
} from '../services/posts'

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

            {/* <Redirect from="/:id/:slug" to="/posts/:slug" /> */}

            <Redirect from="/posts/:id/:slug" to="/posts/:slug" />
            <Redirect from="/posts/:id/:slug/" to="/posts/:slug" />

            <Redirect from="/:year/:month/:date/:slug" to="/posts/:slug" />
            <Redirect from="/:year/:month/:date/:slug/" to="/posts/:slug" />

            <Route path="/posts/:slug">
              <PostDetail posts={posts} tags={tags} categories={categories} users={users} />
            </Route>

            <Route path="/categories/:id/:slug">
              <PostsByCategory posts={posts} tags={tags} categories={categories} users={users} getPostsMethod={getPostsByCategory} />
            </Route>

            <Route path="/tags/:id/:slug">
              <PostsByTag posts={posts} tags={tags} categories={categories} users={users} getPostsMethod={getPostsByTag} />
            </Route>

            <Redirect to="/" />

          </Switch>
        </>
      
        :

        <>
        </>
      
      }
      
    </>

  )
}