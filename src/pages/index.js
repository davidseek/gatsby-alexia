import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
  <Layout>
    <div>
      <Masonry className="showcase">
        {data.allDatoCmsEditorial.edges.map(({ node: element }) => (
          <div key={element.id} className="showcase__item">
            <figure className="card">
              <a href={`/works/${element.slug}`} className="card__image">
                <Img fluid={element.coverImage.fluid} />
              </a>
              <figcaption className="card__caption">
                <h6 className="card__title">
                  <a href={`/works/${element.slug}`}>{element.title}</a>
                </h6>
              </figcaption>
            </figure>
          </div>
        ))}
      </Masonry>

      <div className="imprint-container">
        <div className="imprint-buttons">
          <a href={`/imprint`}>IMPRINT</a>
        </div>

        <div className="imprint-buttons">
          <a href={`/datenschutz`}>DATENSCHUTZ</a>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsEditorial(sort: { fields: [position], order: ASC }) {
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
