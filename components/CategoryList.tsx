import Link from "next/link";

type CategoryListProps = {
  categories: string[];
};
function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className={"w-full p-5 bg-white rounded-lg shadow-md mt-6"}>
      <h3 className={"text-2xl bg-gray-800 text-white p-3 rounded"}>
        Categories
      </h3>
      <ul>
        {categories.map((category, index) => (
          <Link key={index} href={`/blog/category/${category.toLowerCase()}`}>
            <li
              key={index}
              className={"p-4 hover:bg-gray-100 border-b-2 border-gray-300"}
            >
              {category}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
