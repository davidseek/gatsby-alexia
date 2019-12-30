import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

const About = ({ data: { datenschutz } }) => (
  <Layout>
    <article className="sheet">
      <div className="sheet__inner">
        <h1 className="sheet__title">{datenschutz.title}</h1>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: datenschutz.datenschutzNode.childMarkdownRemark.html,
          }}
        />
      </div>
    </article>
  </Layout>
)

export default About

export const query = graphql`
  query DatenschutzQuery {
    datenschutz: datoCmsDatenschutzPage {
      title
      datenschutzNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
