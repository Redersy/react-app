import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type FunctionComponent } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const withQuery = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) =>
  function props(props: T) {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
        {process.env.mode === "development" && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    );
  };

export default withQuery;
