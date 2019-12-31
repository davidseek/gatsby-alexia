import React, { useState } from "react";
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Layout from "../components/layout"
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import close from '../assets/close-button.png'

const TemplateWrapper = ({ data }) => {

    const [showImage, setShowImage] = useState(false);
    const [image, setImage] = useState('');

    return (
        <Layout>

            <div>
                {showImage && (
                    <Dialog className="image__dialog" aria-labelledby="image__dialog">
                        <div>
                            <img 
                                className="image__large"
                                key={image} 
                                src={image}
                            />

                            <img 
                                alt="close-button"
                                key="close-button"
                                src={close}
                                className="image__close-button"
                                onClick={() => setShowImage(!showImage)}
                            />
                        </div>
                    </Dialog>
                )}

                <article className="sheet">
                    <HelmetDatoCms seo={data.datoCmsBeauty.seoMetaTags} />
                    <div className="work__inner">
                        <h1 className="sheet__title">{data.datoCmsBeauty.title}</h1>
                        <div 
                            className="work__body"
                            dangerouslySetInnerHTML={{
                                __html: data.datoCmsBeauty.descriptionNode.childMarkdownRemark.html,
                            }}
                        />

                            {data.datoCmsBeauty.gallery.map(({ fluid }) => (
                                <div key={fluid.src} className="work__item">
                                    <figure className="card">
                                        <img 
                                            alt={data.datoCmsBeauty.title} 
                                            key={fluid.src} 
                                            src={fluid.src}
                                            onClick={() => {
                                                console.log('onClick: ', fluid.src);
                                                setImage(fluid.src);
                                                setShowImage(!showImage);
                                            }} 
                                        />
                                    </figure>
                                </div>
                            ))}
                    </div>
                </article>
            </div>
        </Layout>
    );
}

export default TemplateWrapper

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
