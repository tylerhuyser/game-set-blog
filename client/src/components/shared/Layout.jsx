import React, { useState, useEffect } from 'react'

import Header from '../shared/Header'
import Sidebar from '../shared/Sidebar'
import Footer from '../shared/Footer'

import Loader from '../shared/Loader'

import './Layout.css'


export default function Layout(props) {

  const { categories, tags } = props
  const { location } = props

  const isHome = location.pathname === '/';

  const [isLoading, setIsLoading] = useState(isHome)

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }
  }, [isLoading]);

    // Sets target="_blank" rel="noopener noreferrer" on external links
    const handleExternalLinks = () => {
      const allLinks = Array.from(document.querySelectorAll('a'));
      if (allLinks.length > 0) {
        allLinks.forEach(link => {
          if (link.host !== window.location.host) {
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('target', '_blank');
          }
        });
      }
    };
  
    useEffect(() => {
      handleExternalLinks();
    }, []);
  
  return(
    <>
      
      {isLoading && isHome ?
        
        <Loader finishLoading={() => setIsLoading(false)} />

        :
      
        <div className="layout-container">

          <Header isHome={isHome} />

          <div className="body-container">

            {props.children}

            <Sidebar categories={categories} tags={tags} />

          </div>

        </div>
      
        }
          
    </>
    
  )

}

