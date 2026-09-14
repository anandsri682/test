import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AVM Smart Solutions",
    short_name: "AVM Smart",
    description:
      "AVM Smart provides website development, mobile app development, custom web applications, UI/UX design, and software solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#07070a",
    theme_color: "#F59E0B",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
