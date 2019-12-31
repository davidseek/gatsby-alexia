import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from 'gatsby-image'

import "../styles/index.sass";

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite { 
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introTextNode {
              childMarkdownRemark {
                html
              } 
            } 
            logo {
              fluid(maxWidth: 450, imgixParams: { fm: "png", auto: "compress" }) {
                ...GatsbyDatoCmsSizes
              } 
            }
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={data => (
        <div className={`container ${showMenu ? "is-open" : ""}`}>
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />

          <div className="container__sidebar">
            <div className="sidebar">

              <a className="header__a" href="./">
                <Img fluid={data.datoCmsHome.logo.fluid} className="header__logo" alt="logo" />
              </a>

              <div
                className="sidebar__intro"
                dangerouslySetInnerHTML={{
                  __html:
                    data.datoCmsHome.introTextNode.childMarkdownRemark.html
                }}
              />
              <ul className={`sidebar__menu ${showMenu ? "is-open" : ""}`}>
                
                  <li>
                    <Link to="/">EDITORIAL</Link>
                  </li>

                  <li>
                    <Link to="/commercial">COMMERCIAL</Link>
                  </li>

                  <li>
                    <Link to="/beauty">BEAUTY</Link>
                  </li>

                  <li>
                    <Link to="/people">PEOPLE</Link>
                  </li>

                  <li>
                    <Link to="/film">FILM & TV</Link>
                  </li>

                  <li>
                    <Link to="/contact">CONTACT</Link>
                  </li>

                  <li>
                    <Link to="/about">ABOUT</Link>
                  </li>

              </ul>
              <p className="sidebar__social">
                {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                  <a
                    key={profile.profileType}
                    href={profile.url}
                    target="blank"
                    className={`social social--${profile.profileType.toLowerCase()}`}
                  >
                    {" "}
                  </a>
                ))}
              </p>
             
              <div className="contact-copyright">
                ©2019 
                <a href="https://www.davidseek.com">
                  <p className="contact-copyright-url">David Seek</p>
                </a>
                <br />All rights reserved
              </div>

            </div>
          </div> 



        
          <div className="container__body">

            <div className="container__mobile-header">

              <div className="header">

                <a className="header__a" href="/">
                  <Img fluid={data.datoCmsHome.logo.fluid} className="header__logo" alt="logo" />
                </a>  

                <div className="header__menu">
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setShowMenu(!showMenu);
                    }}
                  />
                </div>
                
              </div>
            </div>

            <div className="container__browser-header">

              <div className="header">

                <a className="header__a" href="/">
                  <Img fluid={data.datoCmsHome.logo.fluid} className="header__logo" alt="logo" />
                </a>

                <ul>

                  <li className="browser-header__menu">
                    <Link to="/" activeStyle={{ color: "rgb(255, 196, 186)" }}>EDITORIAL</Link>
                  </li>

                  <li className="browser-header__menu">
                    <Link to="/commercial" activeStyle={{ color: "rgb(255, 196, 186)" }}>COMMERCIAL</Link>
                  </li>

                  <li className="browser-header__menu">
                    <Link to="/beauty" activeStyle={{ color: "rgb(255, 196, 186)" }}>BEAUTY</Link>
                  </li>

                  <li className="browser-header__menu">
                    <Link to="/people" activeStyle={{ color: "rgb(255, 196, 186)" }}>PEOPLE</Link>
                  </li>

                  <li className="browser-header__menu">
                    <Link to="/film" activeStyle={{ color: "rgb(255, 196, 186)" }}>FILM & TV</Link>
                  </li>

                  <li className="browser-header__menu">
                    <Link to="/contact" activeStyle={{ color: "rgb(255, 196, 186)" }}>CONTACT</Link>
                  </li>

                  <li className="browser-header__menu">
                    <Link to="/about" activeStyle={{ color: "rgb(255, 196, 186)" }}>ABOUT</Link>
                  </li>

                </ul>
                
              </div>
            </div>

            {children}
          </div>
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;