/*
  File responsible for handle leads columns
*/

import type { CellClickedEvent, ColDef } from "ag-grid-community";
import type { Lead } from "../types";
import Button from "@/components/button";

const LeadColumns = (
  handleConvert: (lead: Lead) => void,
  handleRowClick: (lead: Lead) => void,
  isLoading: boolean,
  loadingId: string
) =>
  [
    { headerName: "Name", field: "name", sort: "asc" },
    { headerName: "Company", field: "company" },
    { headerName: "Email", field: "email" },
    { headerName: "Source", field: "source" },
    { headerName: "Score", field: "score" },
    { headerName: "Status", field: "status" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: CellClickedEvent<Lead>) => (
        <div className="flex gap-3">
          <Button
            onClick={() => {
              handleConvert(params.data as Lead);
            }}
            className=" px-3 bg-gray-500 text-white rounded hover:bg-primary my-1"
            isLoading={params?.data?.id === loadingId && isLoading}
          >
            Convert
          </Button>
          <Button
            onClick={() => handleRowClick(params.data as Lead)}
            className=" px-3 bg-indigo-500 text-white rounded hover:bg-indigo-560 my-1"
          >
            Edit
          </Button>
        </div>
      ),
      autoHeight: true
    }
  ] as ColDef<Lead & { actions?: string }>[];

export default LeadColumns;
