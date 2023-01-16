import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import SearchResults from "@/components/SearchResults";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      if (searchTerm.trim()) {
        const res = await fetch(`/api/search?term=${searchTerm}`);
        const { data } = await res.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    };

    getResults();
  }, [searchTerm]);

  return (
    <div className="relative bg-gray-600 p-4">
      <div className="container mx-auto flex items-center justify-center md:justify-end">
        <div className="relative text-gray-600 w-72">
          <form>
            <input
              type="search"
              name="search"
              id="search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-72"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
            />

            <FaSearch className="absolute top-0 right-0 text-black mt-3 mr-4" />
          </form>
        </div>
      </div>
      <SearchResults results={searchResults} />
    </div>
  );
}

export default Search;
