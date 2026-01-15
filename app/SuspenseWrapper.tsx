'use client';

import { Suspense } from 'react';
import Homepage from '@/src/Page/Homepage';

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Homepage />
    </Suspense>
  );
}