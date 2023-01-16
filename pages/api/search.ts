// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Data = {
  result: string;
  data: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let posts: any[] = [];

  if (process.env.NODE_ENV === "production") {
    // TODO: Fetch from cache
  } else {
    const files = fs.readdirSync(path.join("posts"));

    posts = files.map((filename) => {
      const slug = filename.replace(".md", "");

      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );

      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        frontmatter,
        slug,
      };
    });
  }

  const results = posts.filter((post) => {
    const regex = new RegExp(`${req.query.term}`, "gi");
    return (
      post.frontmatter.title.match(regex) ||
      post.frontmatter.excerpt.match(regex) ||
      post.frontmatter.category.match(regex)
    );
  });

  res.status(200).json({ data: results, result: "success" });
}
