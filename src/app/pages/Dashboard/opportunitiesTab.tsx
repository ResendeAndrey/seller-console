import Loading from "@/components/loading";
import OpportunityColumns from "@/features/opportunities/utils/columns";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import SearchInput from "@/components/searchInput";
import Pagination from "@/components/pagination";
import { useDebounce } from "@/hooks/customs/useDebounce";
import useGetOpportunities from "@/features/opportunities/hooks/query/usegetOpportunitiesList";
import { tableHeigh } from "@/utils/constants/table";

const Opportunities = () => {
  const columns = useMemo(() => OpportunityColumns, []);
  const [search, setSearch] = useState<string>();
  const debouncedSearch = useDebounce(search, 500) ?? undefined;
  const [page, setPage] = useState<number>(() => 1);
  const { data, isLoading } = useGetOpportunities({
    search: debouncedSearch,
    page
  });

  return (
    <div className="flex flex-col gap-4">
      <SearchInput search={search} setSearch={setSearch} />
      <div style={{ height: tableHeigh, width: "100%" }}>
        <AgGridReact
          columnDefs={columns}
          defaultColDef={{
            sortable: true,
            sortingOrder: ["asc", "desc"],
            flex: 1,
            minWidth: 100
          }}
          rowData={data?.data}
          overlayNoRowsTemplate="No opportunities found"
          loading={isLoading}
          loadingOverlayComponent={() => <Loading />}
        />
        <Pagination
          currentPage={page}
          totalPages={data?.totalPages || 1}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Opportunities;
