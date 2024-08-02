import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface ReactQueryProviderProps {
  children: React.ReactNode;
  showDevTools?: boolean;
}

const ReactQueryProvider = ({
  showDevTools = false,
  children,
}: ReactQueryProviderProps) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false,
          retry: false,
        },
      },
    }),
  );
  return (
    <QueryClientProvider client={client}>
      {showDevTools && <ReactQueryDevtools buttonPosition="bottom-left" />}
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
