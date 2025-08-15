export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
};

export type LeadDetailSlideOverProps = {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Lead) => void;
  isLoading?: boolean;
};

export type LeadDetailSlideOverPayload = {
  email: string;
  status: string;
};

export type getLeadsParams = {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
};
