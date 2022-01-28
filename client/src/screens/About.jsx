import React from 'react'
import './About.css'


export default function About() {
  
  return(
    <div className="about-container">

      <div className="about-container-hero-image-container">
        
        <div>
          <img src="https://i.imgur.com/qp6aL3w.jpg" alt="about-me-hero" />
        </div>
      </div>

      <div className="social-icons-container">

        <i className="fab fa-twitter"></i>
        
        <i className="fab fa-instagram"></i>

        <i className="far fa-envelope"></i>

      </div>

        <p className="about-container-subtitle">“I live through the achievements of others.”</p>

        <div className="about-container-content-container">
        
          After Google Search informed me that I visited Simona Halep’s Wikipedia page 57 times in the past month, I finally decided to admit I have a problem.

          This blog is the solution.<br/><br/>

          A timeline of my unclaimed tennis dream:<br/>

          <ul>

            <li>2005 – Losing to Anthony “Beans” Palicciono in both the singles & doubles finals of the YMCA tennis camp </li>

            <li>2007 – 2009 – Watching my childhood hero, Andy Roddick, lose at the Legg Mason Tennis Classic three years running (I guess I was his bad luck charm?) </li>

            <li>2012 – 2x High School Record Holder for most aces & double faults in one match (28 aces to 23 double faults) </li>

            <li>2014 – Wimbledon Doubles Champion (Nintendo Wii) </li>

            <li>2017 – US Open ball kid reject</li>

          </ul><br/>

          <span className="about-me-cta">Follow me on Instagram: @tylerhuijser. Or shoot me an email at tyler@gameset.blog.</span>
      
      </div>
      
    </div>
  )
}