/*
  This file contains the useUpdateLead hook by useQuery
  Responsibilities:
    - update lead
*/

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Lead } from "../../types";
import { updateLead } from "../../api/leads";
import { toast } from "sonner";
import { CommonDataResponse } from "@/types/axios";

export const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Lead) => updateLead(data),
    onSuccess: (data) => {
      toast.success(`Lead ${data.name} updated successfully`);
      queryClient.setQueriesData<CommonDataResponse<Lead[]>>(
        { queryKey: ["leads"], exact: false },
        (oldData) => {
          if (oldData) {
            return {
              ...oldData,
              data: oldData.data.map((lead) => {
                if (lead.id === data.id) {
                  return data;
                }
                return lead;
              })
            };
          }
          return oldData;
        }
      );
    }
  });
};
