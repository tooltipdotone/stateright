import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent";
import Layout from "@/components/Layout/Layout";
import { placeholderImage } from "@/utils";
import axios from "axios";
import parse, { domToReact } from "html-react-parser";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const page = await getPageDetails(params.slug);
  return {
    title: page?.title || "Page Not Found",
    description: page?.meta_description || "",
  };
}

const getPageDetails = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_END_POINT}pages/${slug}`
    );
    return response?.data?.data || [];
  } catch (error) {
    console.error("Error fetching Product Items Data:", error);
    return [];
  }
};

const SinglePage = async ({ params }) => {
  const page = await getPageDetails(params?.slug);

  if (!page) {
    return "Not Found";
  }
  const options = {
    replace: (domNode) => {
      // Check if the node is an anchor tag <a>
      if (domNode.name === "a" && domNode.attribs && domNode.attribs.href) {
        const { href, ...otherAttribs } = domNode.attribs;
        return (
          <Link href={href} {...otherAttribs} className="blog_link">
            {domToReact(domNode.children)}
          </Link>
        );
      }
    },
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <section className="aboutus">
          <BreadcrumbComponent title2={page.title} />
          <div className="container">
            <div className="page_content">
              {page.image && (
                <img
                  src={page?.image}
                  width="100%"
                  height="150"
                  alt="Page Feature Image"
                  className="my-2 rounded"
                  onErrorCapture={placeholderImage}
                />
              )}
              {parse(page.content || "", options)}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SinglePage;
