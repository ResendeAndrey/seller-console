/*
  This file contains the useGetLeadList hook by useQuery
  Responsibilities:
    - get leads
*/

import { useQuery } from "@tanstack/react-query";

import { getLeads } from "../../api/leads";
import { getLeadsParams } from "../../types";

const useGetLeadList = (filter: getLeadsParams) => {
  return useQuery({
    queryKey: ["leads", filter],
    queryFn: () => {
      return getLeads(filter);
    },
    retry: 2,
    staleTime: 60 * 1000 * 5 // 5 minutes
  });
};

export default useGetLeadList;
