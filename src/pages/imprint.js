import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

const About = ({ data: { imprint } }) => (
  <Layout>
    <article className="sheet">
      <div className="sheet__inner">
        <h1 className="sheet__title">{imprint.title}</h1>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: imprint.imprintNode.childMarkdownRemark.html,
          }}
        />
      </div>
    </article>
  </Layout>
)

export default About

export const query = graphql`
  query ImprintQuery {
    imprint: datoCmsImprintPage {
      title
      imprintNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
