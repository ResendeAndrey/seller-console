import Leads from "@/app/pages/Dashboard/leadsTab";
import Opportunities from "@/app/pages/Dashboard/opportunitiesTab";
import type { tabItems } from "@/components/tab/types";

export const Tabs: tabItems[] = [
  {
    name: "Leads",
    component: <Leads />
  },
  {
    name: "Opportunities",
    component: <Opportunities />
  }
];
