import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const About = ({ data: { contact } }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={contact.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{contact.title}</h1>
        <div className="sheet__gallery">
          <Img fluid={contact.photo.fluid} />
        </div>

        <a href={'tel:' + contact.phoneNumber}>
            <p className="contact-phone">{contact.phoneNumber}</p>
        </a>

        <a href={'mailto:' + contact.email}>
            <p className="contact-mail">{contact.email}</p>
        </a>

        <p className="contact-copyright">
            ©2019 
            <a href="https://www.davidseek.com">
                <p className="contact-copyright-url">David Seek</p>
            </a>
            - All rights reserved
        </p>

      </div>
    </article>
  </Layout>
) 

export default About

export const query = graphql`
  query ContactQuery {
    contact: datoCmsContactPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      email
      phoneNumber
      photo {
        fluid(maxWidth: 400, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
