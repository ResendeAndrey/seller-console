/*
  This component handle the filter and show component according to currentTab.
  Responsibilities:
    - render SearchInput component
    - render select with all filterStatus options
*/

import SearchInput from "@/components/searchInput";
import { filterStatus } from "@/utils/constants/filterStatus";
import React from "react";

type filterProps = {
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  statusFilter?: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
};
const Filter = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter
}: filterProps) => {
  return (
    <div className="flex gap-2 items-center md:w-1/4 flex-col md:flex-row">
      <SearchInput search={search} setSearch={setSearch} />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm
               bg-white text-gray-900 placeholder-gray-400
               dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500
               focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
               transition w-full md:w-auto"
      >
        {filterStatus.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
