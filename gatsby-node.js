const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allContentfulBlogPost {
        nodes {
          slug
          metadata {
            tags {
              name
            }
          }
        }
      }
      allContentfulTag {
        nodes {
          name
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("Error fetching posts or tags:", result.errors);
    return;
  }

  const posts = result.data.allContentfulBlogPost.nodes;
  posts.forEach((post) => {
    createPage({
      path: `/blog/${post.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: { slug: post.slug },
    });
  });

  const tags = result.data.allContentfulTag.nodes;
  tags.forEach((tag) => {
    const relatedPosts = posts
      .filter((post) =>
        post.metadata?.tags.some((postTag) => postTag.name === tag.name)
      )
      .map((post) => post.slug);

    if (relatedPosts.length > 0) {
      createPage({
        path: `/tag/${tag.name.toLowerCase().replace(/\s+/g, "-")}`,
        component: path.resolve(`./src/templates/tag-post.js`),
        context: {
          tagName: tag.name,
          relatedPosts,
        },
      });
    }
  });
};
exports.onCreatePage = async ({ page, actions }) => {
  const { deletePage } = actions;

  // Netlify sets CONTEXT = "branch-deploy" for branch deploys
  const isBranchDeploy = process.env.CONTEXT === "branch-deploy";

  if (isBranchDeploy && /^\/reviews\/?$/.test(page.path)) {
    deletePage(page);
  }
};