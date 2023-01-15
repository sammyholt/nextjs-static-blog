type PostType = {
  slug: string;
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

export default PostType;
