import React from 'react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsCommercial.seoMetaTags} />
      <div className="work__inner">

        <h1 className="sheet__title">{data.datoCmsCommercial.title}</h1>

        <div 
          className="work__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsCommercial.descriptionNode.childMarkdownRemark.html,
          }}
        />


        {data.datoCmsCommercial.gallery.map(({ fluid }) => (

          <div className="work__item">

            <figure className="card">
              <img alt={data.datoCmsCommercial.title} key={fluid.src} src={fluid.src} />
            </figure>

          </div>
        ))}

      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query CommercialQuery($slug: String!) {
    datoCmsCommercial(slug: { eq: $slug }) {
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
