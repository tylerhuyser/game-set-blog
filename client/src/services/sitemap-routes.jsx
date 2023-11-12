import React from 'react';
import { Switch, Route } from 'react-router';
 
export default (
    <Route>
      <Route path="/" />
      <Route path="/about" />
      <Route path="/posts/:slug" />
      <Route path="/categories/:id/:slug" />
      <Route path="/tags/:id/:slug" />
    </Route>
)