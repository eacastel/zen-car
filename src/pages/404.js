import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const NotFoundPage = () => (
  <Layout>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)
export const Head = () => (
  <Seo
      title="404 Not Found | Zen Car Buying"
  />
)
export default NotFoundPage
