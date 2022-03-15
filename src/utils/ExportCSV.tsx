import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';

const ExportCSV = ({ data, items }: any) => {
  const fileHeaders = (items.filter((item: any) => item.Header !== "Image")).map((item: any) => {
    return { label: item.Header, key: item.accessor };
  });

  return (
    <div className=''>
      <CSVLink
        headers={fileHeaders}
        data={data}
        filename="results.csv"
        target="_blank"
      >
        Export
      </CSVLink>
    </div>
  );
}

export default ExportCSV;
