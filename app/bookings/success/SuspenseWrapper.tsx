'use client';

import { Suspense } from 'react';
import BookingSuccessContent from './BookingSuccessContent';

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}