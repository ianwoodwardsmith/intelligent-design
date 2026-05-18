/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:          process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
    additionalSitemaps: [],
  },
  // Exclude pages that shouldn't be indexed
  exclude: ["/api/*", "/privacy", "/terms"],
};
