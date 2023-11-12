import { getPosts } from "./posts"
import { getTags } from '.tags'
import { getCategories } from '.categories'

require("babel-register")({
  presets: ["es2015", "react"]
});
 
const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "posts",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

async function generateSitemap() {
  try {
    const posts = await getPosts()
    const categories = await getCategories()
    const tags = await getTags()

    let postIDs = []
    let categoryIDs = []
    let tagIDs = []

    for(var i = 0; i < posts.length; i++) {
      postIDs.push({ id: posts.data[i].id });
    }

    for(var i = 0; i < categories.length; i++) {
      categoryIDs.push({ id: categories.data[i].id });
    }

    for(var i = 0; i < tags.length; i++) {
      tagIDs.push({ id: tags.data[i].id });
    }

    const paramsConfig = {
      "/posts/:slug": postIDs,
      "/categories/:id/:slug": categoryIDs,
      "/tags/:id/:slug": tagIDs
    };

    return (
      new Sitemap(router)
          .applyParams(paramsConfig)
          .build("https://www.gamesetblog.com")
          .save("./public/sitemap-index.xml")
    );

  } catch(e) {
    console.log(e);
  } 
}

generateSitemap();