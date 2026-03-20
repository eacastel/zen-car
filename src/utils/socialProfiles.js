export const SOCIAL_PROFILE_URLS = {
  google: "https://maps.app.goo.gl/bS4cykpSzT3H7jYCA",
  facebook: "https://www.facebook.com/profile.php?id=61568879049463",
  instagram: "https://www.instagram.com/zencarbuying?igsh=MTBoOTA4czUxOXU2bg==",
  linkedin: "https://www.linkedin.com/company/zen-car-buying",
  yelp: "https://www.yelp.com/biz/zencarbuying",
}

export const SOCIAL_SCHEMA_SAME_AS = [
  SOCIAL_PROFILE_URLS.google,
  SOCIAL_PROFILE_URLS.facebook,
  SOCIAL_PROFILE_URLS.instagram,
  SOCIAL_PROFILE_URLS.linkedin,
  SOCIAL_PROFILE_URLS.yelp,
]

export const buildTrackedSocialUrl = (
  platform,
  {
    source = "website",
    medium = "footer",
    campaign = "social_clicks",
    content = platform,
  } = {}
) => {
  const baseUrl = SOCIAL_PROFILE_URLS[platform]
  if (!baseUrl) return ""

  const url = new URL(baseUrl)
  url.searchParams.set("utm_source", source)
  url.searchParams.set("utm_medium", medium)
  url.searchParams.set("utm_campaign", campaign)
  url.searchParams.set("utm_content", content)
  return url.toString()
}
