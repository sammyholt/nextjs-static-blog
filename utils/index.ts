// @ts-ignore
export const sortByDate = (a, b) => {
  // @ts-ignore
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};
