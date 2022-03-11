import { GreenSpinner } from '@app/components';
import React from 'react';

export const Loader = () => {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center">
      <GreenSpinner className="h-10 w-10 animate-spin text-emerald-500" />
    </div>
  );
};
