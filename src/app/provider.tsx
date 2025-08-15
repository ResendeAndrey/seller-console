/*
  AppProvider.tsx

  The AppProvider component is a wrapper around the QueryClientProvider and ThemeProvider components.
  File is used to keep all the providers together
*/

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../context/theme/theme";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Toaster } from "sonner";

ModuleRegistry.registerModules([AllCommunityModule]);

const AppProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <Toaster position="top-right" richColors />
      {children}
    </ThemeProvider>
  </QueryClientProvider>
);

export default AppProvider;
