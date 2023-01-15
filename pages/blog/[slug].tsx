import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import CategoryLabel from "@/components/CategoryLabel";

type PostPageProps = {
  slug: string;
  content: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    cover_image: string;
    category: "JavaScript" | "TypeScript" | "CSS" | "Python" | "Ruby" | "PHP";
    author: string;
    author_image: string;
  };
};
function PostPage({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
}: PostPageProps) {
  return (
    <Layout title={title}>
      <Link href="/blog">Go Back</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <Image
          src={cover_image}
          height={300}
          width={480}
          alt={title}
          className={"w-full rounded"}
        />
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className={"flex items-center"}>
            <Image
              src={author_image}
              width={40}
              height={40}
              alt={author}
              className={
                "mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              }
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>

        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      slug,
      frontmatter,
      content,
    },
  };
}

export default PostPage;
