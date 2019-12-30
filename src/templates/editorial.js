import React from 'react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

var showImage = true

export default ({ data }) => (
  <Layout>

    <div className={`image ${showImage ? "is-open" : ""}`}>

    </div>

    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsEditorial.seoMetaTags} />
      <div className="work__inner">

        <h1 className="sheet__title">{data.datoCmsEditorial.title}</h1>

        <div 
          className="work__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsEditorial.descriptionNode.childMarkdownRemark.html,
          }}
        />


        {data.datoCmsEditorial.gallery.map(({ fluid }) => (

          <div className="work__item">

            <figure className="card">

              <img 
                alt={data.datoCmsEditorial.title} 
                key={fluid.src} 
                src={fluid.src}
                onClick={e => {
                  e.preventDefault();
                  showImage = !showImage;
                }} 
              />

            </figure>

          </div>
        ))}

      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query EditorialQuery($slug: String!) {
    datoCmsEditorial(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
