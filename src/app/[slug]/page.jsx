import { notFound } from "next/navigation";
import Layout from "@/components/Layout/Layout";
import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent";
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateMetadata({ params }) {
  try {
    const { data } = await getContent(params.slug);
    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || '',
    };
  } catch (error) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }
}

async function getContent(slug) {
  // Try to find content in multiple directories
  const possiblePaths = [
    // Root content directory
    path.join(process.cwd(), 'content', `${slug}.mdx`),
    // Location pages
    path.join(process.cwd(), 'content', 'pages', 'location', `${slug}.mdx`),
    // Safety pages
    path.join(process.cwd(), 'content', 'pages', 'safety', `${slug}.mdx`),
    // About pages (try with locale)
    path.join(process.cwd(), 'content', 'pages', 'about', `${slug}.mdx`),
    // Help pages
    path.join(process.cwd(), 'content', 'pages', 'help', `${slug}.mdx`),
  ];

  for (const filePath of possiblePaths) {
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      return { data, content };
    } catch (error) {
      // Continue to next path
      continue;
    }
  }
  
  throw new Error(`Could not find page: ${slug}`);
}

export default async function ContentPage({ params }) {
  try {
    const { data, content } = await getContent(params.slug);
    
    return (
      <Layout>
        <BreadcrumbComponent title2={data.title} />
        <section className="static_pages">
          <div className="container">
            <div className="static_div">
              <div className="main_title">
                <span>{data.title}</span>
              </div>
              <div className="page_content">
                <MDXRemote source={content} />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const allFiles = [];
    
    // Get files from root content directory
    try {
      const rootDir = path.join(process.cwd(), 'content');
      const rootFiles = await fs.readdir(rootDir);
      const mdxFiles = rootFiles.filter(file => file.endsWith('.mdx'));
      allFiles.push(...mdxFiles.map(file => file.replace('.mdx', '')));
    } catch (error) {
      // Continue if directory doesn't exist
    }
    
    // Get files from location directory
    try {
      const locationDir = path.join(process.cwd(), 'content', 'pages', 'location');
      const locationFiles = await fs.readdir(locationDir);
      const mdxFiles = locationFiles.filter(file => file.endsWith('.mdx'));
      allFiles.push(...mdxFiles.map(file => file.replace('.mdx', '')));
    } catch (error) {
      // Continue if directory doesn't exist
    }
    
    // Get files from other directories
    const otherDirs = ['safety', 'about', 'help'];
    for (const dir of otherDirs) {
      try {
        const dirPath = path.join(process.cwd(), 'content', 'pages', dir);
        const files = await fs.readdir(dirPath);
        const mdxFiles = files.filter(file => file.endsWith('.mdx'));
        allFiles.push(...mdxFiles.map(file => file.replace('.mdx', '')));
      } catch (error) {
        // Continue if directory doesn't exist
      }
    }
    
    // Remove duplicates and return
    const uniqueFiles = [...new Set(allFiles)];
    return uniqueFiles.map(slug => ({ slug }));
  } catch (error) {
    return [];
  }
}
