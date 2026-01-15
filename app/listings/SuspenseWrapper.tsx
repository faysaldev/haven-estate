'use client';

import { Suspense } from 'react';
import PropertyListing from '@/src/Page/Listings/PropertyListing';

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading properties...</div>}>
      <PropertyListing />
    </Suspense>
  );
}