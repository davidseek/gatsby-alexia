import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsBeauty.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsBeauty.title}</h1>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data.datoCmsBeauty.gallery.map(({ fluid }) => (
              <img alt={data.datoCmsBeauty.title} key={fluid.src} src={fluid.src} />
            ))}
          </Slider>
        </div>
        <div 
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsBeauty.descriptionNode.childMarkdownRemark.html,
          }}
        />
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query BeautyQuery($slug: String!) {
    datoCmsBeauty(slug: { eq: $slug }) {
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
