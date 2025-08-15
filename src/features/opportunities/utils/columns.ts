import type { ColDef } from "ag-grid-community";
import type { Opportunity } from "../types";

const OpportunityColumns: ColDef<Opportunity>[] = [
  { headerName: "Name", field: "name", sort: "asc" },
  { headerName: "Company", field: "company" },
  { headerName: "Email", field: "email" },
  { headerName: "Source", field: "source" },
  { headerName: "Score", field: "score" },
];

export default OpportunityColumns;
