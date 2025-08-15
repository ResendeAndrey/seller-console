/*
  This file contains the useGetOpportunities hook by useQuery
  Responsibilities:
    - get opportunities
*/

import { useQuery } from "@tanstack/react-query";
import { getOpportunitiesParams } from "../../types";
import { getOpportunities } from "../../api/opportunities";

const useGetOpportunities = (filter: getOpportunitiesParams) => {
  return useQuery({
    queryKey: ["opportunities", filter],
    queryFn: () => {
      return getOpportunities(filter);
    },
    retry: 2,
    staleTime: 60 * 1000 * 5 // 5 minutes
  });
};

export default useGetOpportunities;
