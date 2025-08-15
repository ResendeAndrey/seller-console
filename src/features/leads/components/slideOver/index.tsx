/*
  This component is used to display the lead details in a slide over.
  Responsibilities:
    - display lead details
    - update lead details
*/

import Input from "@/components/RHF/input";
import type {
  LeadDetailSlideOverPayload,
  LeadDetailSlideOverProps
} from "../../types";
import { useForm } from "react-hook-form";
import Select from "@/components/RHF/select";
import { filterStatus } from "@/utils/constants/filterStatus";
import { validationSchema } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/button";

const LeadDetailSlideOver = ({
  lead,
  isOpen,
  onClose,
  onSave,
  isLoading
}: LeadDetailSlideOverProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LeadDetailSlideOverPayload>({
    defaultValues: {
      email: lead.email,
      status: lead.status
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: LeadDetailSlideOverPayload) => {
    onSave({
      ...lead,
      email: data.email,
      status: data.status
    });
  };

  if (!isOpen || !lead) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-testid="slide-over"
    >
      <div className="absolute inset-0  " onClick={onClose} />

      <div className="relative w-[500px] bg-gray-100 dark:bg-gray-900 p-6 flex flex-col rounded shadow-lg mx-4 md:mx-auto">
        <h2 className="text-lg font-semibold mb-4">{lead?.name}</h2>

        <form
          className="flex flex-col gap-4 flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Email"
            fieldName="email"
            control={control}
            error={errors.email?.message}
          />
          <Select
            label="Status"
            fieldName="status"
            control={control}
            error={errors.status?.message}
            options={filterStatus}
          />

          <div className="mt-3 flex justify-end gap-2 ">
            <Button
              type="button"
              onClick={onClose}
              className="w-30 px-4 py-2 bg-gray-200 rounded dark:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-30 px-4 py-2 bg-primary text-white rounded"
              isLoading={isLoading}
              data-testid="save-button"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadDetailSlideOver;
