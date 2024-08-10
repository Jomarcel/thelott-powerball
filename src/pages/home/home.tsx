import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomeView } from "./home-view";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const HomePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <HomeView />
      </SnackbarProvider>
    </QueryClientProvider>
  );
};
