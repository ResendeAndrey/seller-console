import { Lead } from "../leads/types";

export type Opportunity = Omit<Lead, "status">;

export type getOpportunitiesParams = {
  page?: number;
  limit?: number;
  search?: string;
};
