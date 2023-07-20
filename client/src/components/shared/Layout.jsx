import React, { useState, useEffect } from 'react'

import Header from '../shared/Header'
import Footer from '../shared/Footer'

import IconLogo from '../shared/IconLogo'

import useWindowSize from '../../utils/useWindowSize';

import './Layout.css'


export default function Layout(props) {

  const [menuVisibility, setMenuVisibility] = useState(false);

  let windowSize = useWindowSize()

  const { isMounted, isHome } = props

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
  
  useEffect(() => {
    if (windowSize.width > 758) {
      setMenuVisibility(false)
    }
  }, [windowSize])
  
  return(
    <>
      
      {isMounted ?
      
        <div className="layout-container" style={
          (menuVisibility && windowSize.width <= 758) ? 
            {
              position: 'fixed',
              // overflow: 'hidden'
            }
            :
            {}
        }>

          <Header isHome={isHome} menuVisibility={menuVisibility} setMenuVisibility={setMenuVisibility} />

          <div className="body-container"
            
          >

            {props.children}

            {/* <Sidebar categories={categories} tags={tags} /> */}

          </div>

          <Footer />

        </div>

        :

        <div className="logo-wrapper" id="layout-loader">

          <IconLogo />

        </div>
      
      }
          
    </>
    
  )

}

