import React from 'react';
import Image from 'next/image';
import { avatarSVG } from '@utils/avatarSVG';

interface SimpleCard {
  data: any;
}

export const SimpleCard: React.FC<SimpleCard> = ({ data }) => {
  return (
    <div className="flex h-64 flex-col items-center justify-center space-y-4 rounded-md border border-gray-300 p-4 text-center shadow-sm hover:shadow-md">
      <span className="h-16 w-16">
        <Image src={avatarSVG(data?.alias)} height={64} width={64} />
      </span>
      <h4 className="font-semibold uppercase">{data?.name}</h4>
      <span className="text-sm">
        {data?.batch?.name}-{data?.department?.alias}-{data?.section?.name}
      </span>
    </div>
  );
};
