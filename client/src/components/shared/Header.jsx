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
      
      <div className="header-container slide-in-top-header" style={

        (scrollDirection === 'up' && !scrolledToTop) ?
          { transform: 'translateY(0px)',
            boxShadow: 'none',
            height: "125px"
          }
          :
          (scrollDirection === 'down' && !scrolledToTop) ?
            {
              transform: 'translateY(-125px)',
              boxShadow: 'none',
              height: "125px"
            }
            :
            { transform: 'none' }
      }> 
        
        <div className='mobile-navigation-icons-container'>
        
          {menuVisibility ?
            
            <i className="fas fa-times mobile-icon" onClick={(e) => changeMenuVisibility(e)}></i>
              
            :

            <i className="fas fa-bars mobile-icon" onClick={(e) => changeMenuVisibility(e)}></i>

          }

        </div>

        <TransitionGroup component={null}>
            
          {isMounted && (
              
            <CSSTransition classNames={fadeClass} timeout={timeout}>

              <Link to="/" className="logo-container">

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

    <div className={menuVisibility ? "mobile-menu mobile-menu-visible" : "mobile-menu mobile-menu-hidden"}>

      <Link className="mobile-nav-link" to="/about" onClick={() => setMenuVisibility(false)}>ABOUT</Link>
      <a className="mobile-nav-link" target="_blank" rel="noopener noreferrer" href="https://www.ace-tennis-scores.com">LIVE SCORES</a>

    </div>

    </>
  )
}

Header.propTypes = {
  isHome: PropTypes.bool,
};