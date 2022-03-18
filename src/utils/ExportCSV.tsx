import React from 'react';
import { CSVLink } from 'react-csv';

const ExportCSV = ({ data, items, ...rest }: any) => {
  const fileHeaders = items
    .filter((item: any) => item.Header !== 'Image')
    .map((item: any) => {
      return { label: item.Header, key: item.accessor };
    });

  return (
    <div className="">
      <CSVLink
        headers={fileHeaders}
        data={data}
        filename="results.csv"
        target="_blank"
        {...rest}
      >
        Export
      </CSVLink>
    </div>
  );
};

export default ExportCSV;
