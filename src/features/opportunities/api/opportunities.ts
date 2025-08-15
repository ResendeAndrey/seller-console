/*
  This file contains the api calls for opportunities
  Responsibilities:
    - get opportunities
    - convert opportunity
*/

import { CommonDataResponse } from "@/types/axios";
import { getOpportunitiesParams, Opportunity } from "../types";
import { api } from "@/api";

export const getOpportunities = (
  params?: getOpportunitiesParams
): Promise<CommonDataResponse<Opportunity[]>> => {
  return api.get("/opportunities", { params }).then((res) => res.data);
};

export const postOpportunity = (id: string): Promise<Opportunity> => {
  return api.post(`/opportunities/`, { id }).then((res) => res.data);
};
