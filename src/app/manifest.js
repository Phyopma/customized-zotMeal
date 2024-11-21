export default function manifest() {
  return {
    name: "Zot Menu",
    short_name: "Zot Menu",
    description: "UCI Campus Dining Menu",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f1f",
    theme_color: "#0b0f1f",
    icons: [
      {
        src: "/appicon/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/appicon/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
