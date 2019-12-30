const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsEditorial {
          edges {
            node {
              slug
            }
          }
        }
        allDatoCmsCommercial {
          edges {
            node {
              slug
            }
          }
        }
        allDatoCmsBeauty {
          edges {
            node {
              slug
            }
          }
        }
        allDatoCmsPeoplemodel {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {

      result.data.allDatoCmsEditorial.edges.map(({ node: editorial }) => {

        createPage({
          path: `works/${editorial.slug}`,
          component: path.resolve(`./src/templates/editorial.js`),
          context: {
            slug: editorial.slug,
          },
        })

      })

      result.data.allDatoCmsCommercial.edges.map(({ node: commercial }) => {

        createPage({
          path: `works/${commercial.slug}`,
          component: path.resolve(`./src/templates/commercial.js`),
          context: {
            slug: commercial.slug,
          },
        })

      })
 
      result.data.allDatoCmsBeauty.edges.map(({ node: beauty }) => {

        createPage({
          path: `works/${beauty.slug}`,
          component: path.resolve(`./src/templates/beauty.js`),
          context: {
            slug: beauty.slug,
          },
        })

      })

      result.data.allDatoCmsPeoplemodel.edges.map(({ node: people }) => {

        createPage({
          path: `works/${people.slug}`,
          component: path.resolve(`./src/templates/people.js`),
          context: {
            slug: people.slug,
          },
        })

      })

      resolve()
    })
  })
}
