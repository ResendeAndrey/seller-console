/*
  SearchInput.tsx

  Search input component
  This component simulate a DS SearchInput containing a search input and a clear button
*/

import { XMarkIcon } from "@heroicons/react/24/outline";

type SearchInputProps = {
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const SearchInput = ({ search, setSearch }: SearchInputProps) => {
  return (
    <div className="relative flex-1 w-full">
      <input
        type="text"
        placeholder="Search name or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                   bg-white text-gray-900 placeholder-gray-400
                   dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                   transition"
      />

      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XMarkIcon className="size-5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
