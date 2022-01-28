import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { loaderDelay } from '../../utils';
import { useScrollDirection } from '../../hooks';

import IconLogo from './IconLogo'

import './Header.css'


export default function Header(props) {

  const { isHome } = props

  const [menuVisibility, setMenuVisibility] = useState(false);

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
  
  return(
    <>
      
      <div className="header-container slide-in-top-header"> 

        <div className="desktop-nav" style={

          (scrollDirection === 'up' && !scrolledToTop) ?
            { transform: 'translateY(0px)',
              boxShadow: 'none',
              height: "100px"
            }
            :
            (scrollDirection === 'down' && !scrolledToTop) ?
              {
                transform: 'translateY(-100px)',
                boxShadow: 'none',
                height: "100px"
              }
              :
              { transform: 'none' }
        }>

          <TransitionGroup component={null}>
            
            {isMounted && (
              
                <CSSTransition classNames={fadeClass} timeout={timeout}>

                  <Link to="/" className="desktop-logo-container">

                    <IconLogo />
                        
                  </Link>

                </CSSTransition>
                
              )}

          </TransitionGroup>

          <div className="desktop-nav-links-container">

            <TransitionGroup component={null}>
                
                {isMounted && (
                    
                  <CSSTransition classNames={fadeDownClass} timeout={timeout}>

                    <Link to="/" className="desktop-nav-link" style={{ transitionDelay: `${isHome ? 1 * 100 : 0}ms` }}>HOME</Link>

                  </CSSTransition>

                )}

            </TransitionGroup>

            <TransitionGroup component={null}>
                            
              {isMounted && (

                <CSSTransition classNames={fadeDownClass} timeout={timeout}>

                  <Link to="/about" className="desktop-nav-link" style={{ transitionDelay: `${isHome ? 2 * 100 : 0}ms` }}>ABOUT</Link>

                </CSSTransition>

              )}

            </TransitionGroup>
            
            <TransitionGroup component={null}>
                            
              {isMounted && (
                  
                <CSSTransition classNames={fadeDownClass} timeout={timeout}>

                  <a className="desktop-nav-link" target="_blank" rel="noopener noreferrer" href="https://www.ace-tennis-scores.com" id="live-scores-link" style={{ transitionDelay: `${isHome ? 3 * 100 : 0}ms` }}>LIVE SCORES</a>

                </CSSTransition>

              )}

            </TransitionGroup>

          </div>

        </div>

        <div className="mobile-nav">

          {menuVisibility ?
          
          <i className="fas fa-times mobile-icon" onClick={(e) => changeMenuVisibility(e)}></i>
            
          :

          <i className="fas fa-bars mobile-icon" onClick={(e) => changeMenuVisibility(e)}></i>

          }

          <Link to="/" className="mobile-logo-container">

            <IconLogo style={{
              zIndex: "5",
              textAlign: "center",
              verticalAlign: "center",
              
          }} />

          </Link>

            
          <div className="mobile-header-placeholder"></div>
          

        </div>

        <div id="mobile-menu" className={menuVisibility ? "mobile-menu-visible" : "mobile-menu-hidden"}>

          <Link className="mobile-nav-link" to="/about" onClick={() => setMenuVisibility(false)}>ABOUT</Link>
          <a className="mobile-nav-link" target="_blank" rel="noopener noreferrer" href="https://www.ace-tennis-scores.com">LIVE SCORES</a>

        </div>

        </div>
    </>
  )
}

Header.propTypes = {
  isHome: PropTypes.bool,
};