import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsPeoplemodel.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsPeoplemodel.title}</h1>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data.datoCmsPeoplemodel.gallery.map(({ fluid }) => (
              <img alt={data.datoCmsPeoplemodel.title} key={fluid.src} src={fluid.src} />
            ))}
          </Slider>
        </div>
        <div 
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsPeoplemodel.descriptionNode.childMarkdownRemark.html,
          }}
        />
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query PeopleQuery($slug: String!) {
    datoCmsPeoplemodel(slug: { eq: $slug }) {
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