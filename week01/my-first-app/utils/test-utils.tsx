import { PaintingProvider } from "@/components/ui/painting-contex-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";

const queryClient = new QueryClient();

const custommRenderer = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <PaintingProvider>{ui}</PaintingProvider>
    </QueryClientProvider>
  );
};

// Re-export everything
export * from "@testing-library/react-native";

// Override render method
export { custommRenderer as render };
