'use client';

import { Suspense } from 'react';
import CompareContent from './compare-content';

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
