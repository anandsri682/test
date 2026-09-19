import { MetadataRoute } from "next";
import { DEMOS } from "@/data/demos";
import { SERVICES, SOLUTIONS, PORTFOLIO, BLOG_POSTS } from "@/data/siteData";
import { MAIN_PRICING_SERVICES } from "@/data/pricingData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.avmsmart.in";
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demos`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const pricingRoutes: MetadataRoute.Sitemap = MAIN_PRICING_SERVICES.map((pricing) => ({
    url: `${baseUrl}/pricing/${pricing.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = SOLUTIONS.map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const demoRoutes: MetadataRoute.Sitemap = DEMOS.map((demo) => ({
    url: `${baseUrl}/demos/${demo.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = PORTFOLIO.map((item) => ({
    url: `${baseUrl}/portfolio/${item.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...pricingRoutes,
    ...serviceRoutes,
    ...solutionRoutes,
    ...demoRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
  ];
}
