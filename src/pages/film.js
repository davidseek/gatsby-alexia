import React from 'react'
import { graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
  <Layout>
    {data.allDatoCmsFilm.edges.map(({ node: element }) => (

    <div key={element.video.providerUid} className="video">

        <iframe
        className="video__frame"
        src={getVideoURL(element)}
        title={element.title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
        />
    </div>

    ))}
  </Layout>
) 

function getVideoURL(element) {

    var url = getProviderURL(element)
    url += element.video.providerUid
    return url
}

function getProviderURL(element) {

    if (element.video.provider === 'youtube') {
        return 'https://www.youtube.com/embed/'
    }

    if (element.video.provider === 'vimeo') {
        return 'https://player.vimeo.com/video/'
    }

    return undefined
}

export default IndexPage

export const query = graphql`
  query FilmsQuery {
    allDatoCmsFilm(sort: { fields: [positionOrder], order: ASC }) {
      edges {
        node {  
            positionOrder
            title
            video {
                provider
                providerUid
          }
        }
      }
    } 
  }
`
 