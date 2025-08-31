// app/providers.tsx
'use client';

import * as React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create QueryClient on the client
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60_000, gcTime: 300_000 },
    },
  }));

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
