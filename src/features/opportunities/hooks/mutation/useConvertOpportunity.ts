/*
  This file contains the useConvertOpportunity hook by useMutation
  Responsibilities:
    - convert opportunity

*/

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Opportunity } from "../../types";
import { postOpportunity } from "../../api/opportunities";
import { CommonDataResponse } from "@/types/axios";
import { toast } from "sonner";
import { Lead } from "@/features/leads/types";

export const useConvertOpportunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => postOpportunity(id),
    onSuccess: (data) => {
      toast.success("Lead converted to opportunity");
      queryClient.setQueriesData<CommonDataResponse<Opportunity[]>>(
        {
          queryKey: ["opportunities"],
          exact: false
        },
        (oldData) => {
          console.log(oldData, "OLDDATA");
          if (oldData) {
            return {
              ...oldData,
              data: [...oldData.data, data],
              totalItems: oldData.totalItems + 1
            };
          }
          return {
            data: [data],
            page: 1,
            totalPages: 1,
            totalItems: 1
          };
        }
      );
      queryClient.setQueriesData<CommonDataResponse<Lead[]>>(
        { queryKey: ["leads"], exact: false },
        (oldData) => {
          if (oldData) {
            return {
              ...oldData,
              data: oldData.data.filter((lead) => lead.id !== data.id),
              totalItems: oldData.totalItems - 1
            };
          }
          return {
            data: [],
            page: 1,
            totalPages: 1,
            totalItems: 0
          };
        }
      );
    }
  });
};
