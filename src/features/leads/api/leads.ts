/*
  This file contains the api calls for leads
  Responsibilities:
    - get leads
    - update lead
*/

import { api } from "@/api";
import { getLeadsParams, Lead } from "../types";

import { CommonDataResponse } from "@/types/axios";

export const getLeads = (
  params?: getLeadsParams
): Promise<CommonDataResponse<Lead[]>> => {
  return api.get("/leads", { params }).then((res) => res.data);
};

export const updateLead = (data: Lead): Promise<Lead> => {
  return api.patch(`/leads/${data.id}`, data).then((res) => res.data);
};
