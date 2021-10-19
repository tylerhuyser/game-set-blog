import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { loaderDelay } from '../../utils';
import { useScrollDirection } from '../../hooks';

import IconLogo from './IconLogo'

import './Header.css'

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: var(--navy);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(10px);
  transition: var(--transition);
  ${props =>
    props.scrollDirection === 'up' &&
    !props.scrolledToTop &&
    css`
      height: var(--nav-scroll-height);
      transform: translateY(0px);
      background-color: rgba(10, 25, 47, 0.85);
      box-shadow: 0 10px 30px -10px var(--navy-shadow);
    `};
  ${props =>
    props.scrollDirection === 'down' &&
    !props.scrolledToTop &&
    css`
      height: var(--nav-scroll-height);
      transform: translateY(calc(var(--nav-scroll-height) * -1));
      box-shadow: 0 10px 30px -10px var(--navy-shadow);
    `};
`;


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

        <div className="desktop-nav" style={{
          
        }}>

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
                    
                  <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>

                    <Link to="/" className="desktop-nav-link" style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>HOME</Link>

                  </CSSTransition>

                )}

            </TransitionGroup>

            <TransitionGroup component={null}>
                            
              {isMounted && (

                <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>

                  <Link to="/about" className="desktop-nav-link" style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>ABOUT</Link>

                </CSSTransition>

              )}

            </TransitionGroup>
            
            <TransitionGroup component={null}>
                            
              {isMounted && (
                  
                <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>

                  <a className="desktop-nav-link" target="_blank" href="https://www.ace-tennis-scores.com" id="live-scores-link" style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>LIVE SCORES</a>

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

          <div className="mobile-logo-container">

            <IconLogo style={{
              zIndex: "5",
              textAlign: "center",
              verticalAlign: "center",
              
          }} />

          </div>

            
          <div className="mobile-header-placeholder"></div>
          

        </div>

        <div id="mobile-menu" className={menuVisibility ? "mobile-menu-visible" : "mobile-menu-hidden"}>

          <p className="mobile-nav-link">About</p>
          <p className="mobile-nav-link" target="_blank" href="https://www.gameset.blog">Blog</p>

        </div>

        </div>
    </>
  )
}

Header.propTypes = {
  isHome: PropTypes.bool,
};