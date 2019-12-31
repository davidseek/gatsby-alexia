import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsBeauty.edges.map(({ node: element }) => (
        <div key={element.id} className="showcase__item">
          <figure className="card">
            <a href={`/works/${element.slug}`} className="card__image">
              <Img fluid={element.coverImage.fluid} />
            </a>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <a href={`/works/${element.slug}`}>{element.title}</a>
              </h6>
              <div className="card__description">
                <p>{element.excerpt}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </Layout>
) 

export default IndexPage

export const query = graphql`
  query BeautysQuery {
    allDatoCmsBeauty(sort: { fields: [position], order: ASC }) {
      edges {
        node {  
          id
          title
          slug
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes 
            }
          }
        }
      }
    } 
  }
`
