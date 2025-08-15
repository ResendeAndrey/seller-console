import Filter from "@/features/leads/components/filter";
import Loading from "@/components/loading";
import Pagination from "@/components/pagination";
import LeadDetailSlideOver from "@/features/leads/components/slideOver";
import useGetLeadList from "@/features/leads/hooks/query/useGetLeadList";
import { Lead } from "@/features/leads/types";
import LeadColumns from "@/features/leads/utils/columns";
import { useDebounce } from "@/hooks/customs/useDebounce";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import { tableHeigh } from "@/utils/constants/table";
import { useConvertOpportunity } from "@/features/opportunities/hooks/mutation/useConvertOpportunity";
import { useUpdateLead } from "@/features/leads/hooks/mutation/useUpdateLead";

const Leads = () => {
  const columns = useMemo(() => LeadColumns, []);
  const [search, setSearch] = useState<string>();
  const [page, setPage] = useState<number>(() => 1);
  const debouncedSearch = useDebounce(search, 500) ?? undefined;
  const [statusFilter, setStatusFilter] = useState<string>();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  const { data, isLoading } = useGetLeadList({
    search: debouncedSearch,
    status: statusFilter,
    page
  });

  const { mutateAsync: convertOpportunity, isPending: isConverting } =
    useConvertOpportunity();

  const { mutateAsync: updateLead, isPending: isUpdating } = useUpdateLead();
  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsSlideOverOpen(true);
  };

  const handleConvertToOpportunity = (lead: Lead) => {
    setSelectedLead(lead);
    convertOpportunity(lead.id).then(() => {
      setSelectedLead(null);
    });
  };

  const handleUpdateLead = (lead: Lead) => {
    updateLead(lead).then(() => {
      setSelectedLead(null);
      setIsSlideOverOpen(false);
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <Filter
        search={search}
        setSearch={setSearch}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
      />
      <div
        style={{ height: tableHeigh, width: "100%" }}
        data-testid="ag-grid-leads"
      >
        <AgGridReact
          columnDefs={columns(
            handleConvertToOpportunity,
            handleRowClick,
            isConverting,
            selectedLead?.id as string
          )}
          defaultColDef={{
            sortable: true,
            sortingOrder: ["asc", "desc"],
            minWidth: 200,
            flex: 1
          }}
          rowData={data?.data}
          overlayNoRowsTemplate="No leads found"
          loading={isLoading}
          loadingOverlayComponent={() => <Loading />}
        />
        <Pagination
          currentPage={page}
          totalPages={data?.totalPages || 1}
          onPageChange={(page) => setPage(page)}
          isLoading={isLoading}
        />
      </div>
      {selectedLead && (
        <LeadDetailSlideOver
          lead={selectedLead}
          isOpen={isSlideOverOpen}
          onClose={() => setIsSlideOverOpen(false)}
          onSave={handleUpdateLead}
          isLoading={isUpdating}
        />
      )}
    </div>
  );
};

export default Leads;
