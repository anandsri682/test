import { MetadataRoute } from "next";
import { DEMOS } from "@/data/demos";

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
  ];

  const demoRoutes: MetadataRoute.Sitemap = DEMOS.map((demo) => ({
    url: `${baseUrl}/demos/${demo.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...demoRoutes];
}
