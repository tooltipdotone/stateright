const fs = require("fs");
const globby = require("globby");
const languages = [
  "en",
  "de",
  "sq",
  "hy",
  "az",
  "be",
  "bs",
  "bg",
  "hr",
  "el",
  "cs",
  "da",
  "et",
  "fi",
  "ka",
  "hu",
  "is",
  "kk",
  "kg",
  "lv",
  "lt",
  "mn",
  "cnr",
  "mk",
  "pl",
  "ro",
  "ru",
  "sr",
  "sk",
  "sl",
  "sv",
  "tg",
  "tr",
  "tk",
  "uk",
  "uz",
  "ps",
  "bd",
];

const addPage = (page) => {
  let path = page
    .replace(/^src\/app\//, "")
    .replace(/^content\//, "")
    .replace(/index(\.mdx|\.js|\.jsx|\.ts|\.tsx)?$/, "")
    .replace(/\.(js|jsx|ts|tsx|mdx)$/, "")
    .replace(/page$/, "")
    .replace(/\/$/, "");

  const route = path === "" ? "" : `/${path}`;
  const cleanRoute = route.replace(/\/+$/, "");

  return `  <url>
    <loc>${process.env.NEXT_PUBLIC_WEB_URL}${cleanRoute}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;
};
const addLanguageUrls = () => {
  return languages
    .map(
      (lang) => `
  <url>
    <loc>${process.env.NEXT_PUBLIC_WEB_URL}/${lang}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  `
    )
    .join("");
};

const generateSitemap = async () => {
  const pages = await globby([
    "src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "content/**/*.mdx",
    "!src/app/_*.{js,jsx,ts,tsx}",
    "!src/app/api/**",
  ]);
  const staticPages = pages.filter((p) => !p.includes("["));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(addPage).join("\n")}
${addLanguageUrls()}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
};

generateSitemap();
