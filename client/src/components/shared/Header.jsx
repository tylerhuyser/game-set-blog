import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { loaderDelay } from '../../utils';
import { useScrollDirection } from '../../hooks';
import useWindowSize from '../../utils/useWindowSize';

import IconLogo from './IconLogo'

import './Header.css'


export default function Header(props) {

  const { menuVisibility, setMenuVisibility } = props
  const { isHome } = props

  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? loaderDelay : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  const changeMenuVisibility = (e) => {
    e.preventDefault();
    setMenuVisibility(!menuVisibility);
  };

  let windowSize = useWindowSize()

  console.log(windowSize)
  
  return(
    <>
      
    <div className="header-container slide-in-top-header" style={

        (windowSize.width <= 758 && scrollDirection === 'up' && !scrolledToTop && !menuVisibility) ?
          { transform: 'translateY(0px)',
            boxShadow: 'none',
            height: "calc(75px - 20px)"
          }
          :
          (windowSize.width <= 758 && scrollDirection === 'down' && !scrolledToTop && !menuVisibility) ?
            {
              transform: 'translateY(-75px)',
              boxShadow: 'none',
              height: "calc(75px - 20px)"
            }
            :
            (windowSize.width > 758 && scrollDirection === 'up' && !scrolledToTop && !menuVisibility) ?
            { transform: 'translateY(0px)',
              boxShadow: 'none',
              height: "calc(100px - 20px)"
            }
            :   
            (windowSize.width > 758 && scrollDirection === 'down' && !scrolledToTop && !menuVisibility) ?
            {
              transform: 'translateY(-100px)',
              boxShadow: 'none',
              height: "calc(100px - 20px)"
              }
              :
              { transform: 'none' }
      }> 
            
          {isMounted && (

              <Link to="/" className="header-logo-container">

                <IconLogo />

                <p className="logo-copy-header">GAME, SET, BLOG</p>
                        
              </Link>
                
          )}

        <div className="desktop-nav-links-container">
                
            {isMounted && (

                <Link to="/" className="desktop-nav-link" style={{ transitionDelay: `${isHome ? 1 * 100 : 0}ms` }}>HOME</Link>

          )}
                            
          {isMounted && (

              <Link to="/about" className="desktop-nav-link" style={{ transitionDelay: `${isHome ? 2 * 100 : 0}ms` }}>ABOUT</Link>

          )}
                            
          {isMounted && (
                
              <a className="desktop-nav-link" target="_blank" rel="noopener noreferrer" href="https://www.ace-tennis-scores.com" id="live-scores-link" style={{ transitionDelay: `${isHome ? 3 * 100 : 0}ms` }}>LIVE SCORES</a>

          )}

      </div>
        
      <div className='mobile-navigation-icons-container'>
        
        {menuVisibility ?
          
          <i className="fas fa-times mobile-icon" onClick={(e) => changeMenuVisibility(e)}></i>
            
          :

          <i className="fas fa-bars mobile-icon" onClick={(e) => changeMenuVisibility(e)}></i>

        }

      </div>

    </div>

    <div className={menuVisibility ? "mobile-menu mobile-menu-visible" : "mobile-menu mobile-menu-hidden"}>

      <Link className="mobile-nav-link" to="/" onClick={() => setMenuVisibility(false)}>HOME</Link>
      <Link className="mobile-nav-link" to="/about" onClick={() => setMenuVisibility(false)}>ABOUT</Link>
      <a className="mobile-nav-link" target="_blank" rel="noopener noreferrer" href="https://www.ace-tennis-scores.com">LIVE SCORES</a>

    </div>

    </>
  )
}