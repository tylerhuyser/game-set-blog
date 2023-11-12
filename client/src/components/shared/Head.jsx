import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from "react-router-dom";

const Head = ({ title, description, image }) => {

  const location = useLocation()
  const pathname = location.pathname

  const metadata = {
    defaultTitle: "Game, Set, Blog",
    defaultDescription: "Analysis and opinion on the world of tennis. Grand Slams, ATP, WTA, and ITF. After Google Search informed me that I visited Simona Halep’s Wikipedia page 57 times in the past month, I finally decided to admit I have a problem. This blog is the solution.",
    siteURL: "https://www.gamesetblog.com",
    defaultImage: "../../background-images/metadataImage.png",
    twitterUsername: "@GameSet_Blog"
  }

  const seo = {
    title: title || metadata.defaultTitle,
    description: description || metadata.defaultDescription,
    image: `${metadata.siteURL}${image || metadata.defaultImage}`,
    url: `${metadata.siteURL}${pathname}`,
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${metadata.defaultTitle}`}>
      <html lang="en" />

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={metadata.twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="google-site-verification" content="UWdDiArrGivUbpWkJwWyFiGgMSkGbPiUXXYmB-DqkWE" />
    </Helmet>
  );
};

export default Head;