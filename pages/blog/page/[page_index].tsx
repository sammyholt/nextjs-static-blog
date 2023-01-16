import Layout from "@/components/Layout";
import fs from "fs";
import path from "path";
import PostType from "@/types/PostType";
import Post from "@/components/Post";
import { POSTS_PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/lib/posts";
import CategoryList from "@/components/CategoryList";

type BlogPageProps = {
  posts: PostType[];
  currentPage: number;
  numPages: number;
  categories: string[];
};

export default function BlogPage({
  posts,
  numPages,
  currentPage,
  categories,
}: BlogPageProps) {
  console.log(posts);
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>

          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({ params: { page_index: i.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const page = parseInt((params && params.page_index) || 1);

  const files = fs.readdirSync(path.join("posts"));

  const posts = getPosts();

  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = Array.from(new Set(categories));

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  };
}
