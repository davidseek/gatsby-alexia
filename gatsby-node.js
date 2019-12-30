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

      result.data.allDatoCmsEditorial.edges.map(({ node: element }) => {

        createPage({
          path: `works/${element.slug}`,
          component: path.resolve(`./src/templates/editorial.js`),
          context: {
            slug: element.slug,
          },
        })

      })

      result.data.allDatoCmsCommercial.edges.map(({ node: element }) => {

        createPage({
          path: `works/${element.slug}`,
          component: path.resolve(`./src/templates/commercial.js`),
          context: {
            slug: element.slug,
          },
        })

      })
 
      result.data.allDatoCmsBeauty.edges.map(({ node: element }) => {

        createPage({
          path: `works/${element.slug}`,
          component: path.resolve(`./src/templates/beauty.js`),
          context: {
            slug: element.slug,
          },
        })

      })

      result.data.allDatoCmsPeoplemodel.edges.map(({ node: element }) => {

        createPage({
          path: `works/${element.slug}`,
          component: path.resolve(`./src/templates/people.js`),
          context: {
            slug: element.slug,
          },
        })

      })

      resolve()
    })
  })
}
