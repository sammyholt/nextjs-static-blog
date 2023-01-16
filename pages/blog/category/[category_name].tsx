import Layout from "@/components/Layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PostType from "@/types/PostType";
import Post from "@/components/Post";
import { getPosts } from "@/lib/posts";
import CategoryList from "@/components/CategoryList";

type CategoryBlogPageProps = {
  posts: PostType[];
  category_name: string;
  categories: string[];
};

export default function CategoryBlogPage({
  posts,
  category_name,
  categories,
}: CategoryBlogPageProps) {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            Posts in {category_name}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
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

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }: any) {
  const posts = getPosts();

  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = Array.from(new Set(categories));

  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      category_name,
      categories: uniqueCategories,
    },
  };
}
