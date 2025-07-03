import { notFound } from "next/navigation";
import Layout from "@/components/Layout/Layout";
import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent";
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateMetadata({ params }) {
  try {
    const { data } = await getAboutContent(params.slug);
    return {
      title: data.title || 'About Page',
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

async function getAboutContent(slug) {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'pages', 'about');
    const filePath = path.join(contentDir, `${slug}.mdx`);
    
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return { data, content };
  } catch (error) {
    throw new Error(`Could not find About page: ${slug}`);
  }
}

export default async function AboutPage({ params }) {
  try {
    const { data, content } = await getAboutContent(params.slug);
    
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
    const contentDir = path.join(process.cwd(), 'content', 'pages', 'About');
    const files = await fs.readdir(contentDir);
    
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        slug: file.replace('.mdx', '')
      }));
  } catch (error) {
    return [];
  }
}
