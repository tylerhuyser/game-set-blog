// import React from 'react';
// import { getPosts } from "./posts.js"
// import getPosts from "./posts.js"
// import { getCategories } from './categories.js'
// import getCategories from './categories.js';
// import { getTags } from './tags.js'
// import getTags from "./tags.js"
// import { es2015, react } from 'babel-register'
// import Sitemap from 'react-router-sitemap'
// import router from "./sitemap-routes.jsx"
// import axios from 'axios';


require("babel-register")({
  presets: ["es2015", "react"]
});
 
const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

const baseUrl = process.env.NODE_ENV === 'production' ? `https://www.gamesetblog.com/wp-json/wp/v2` : `https://www.gamesetblog.com/wp-json/wp/v2`

const axios = require("axios")
const api = axios.create({
  baseURL: baseUrl
});


const getPosts = async () => {
  const resp = await api.get(`/posts?_embed&per_page=100`)
  return resp.data
}


async function generateSitemap() {
  try {
    const postsData = await getPosts()

    let posts = []


    for(var i = 0; i < postsData.length; i++) {
      posts.push({ slug: postsData[i].slug });
    }

    const paramsConfig = {
      "/posts/:slug": posts,
    };

    return (
      new Sitemap(router)
          .applyParams(paramsConfig)
          .build("https://gamesetblog.com")
          .save("./public/sitemap-index.xml")
    );

  } catch(e) {
    console.log(e);
  } 
}

generateSitemap();