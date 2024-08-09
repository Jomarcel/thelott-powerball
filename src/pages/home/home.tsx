import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomeView } from "./home-view";
// import "./home.css";

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
      <HomeView />
    </QueryClientProvider>
  );
};
