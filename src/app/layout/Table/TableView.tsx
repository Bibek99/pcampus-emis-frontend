import {
  Column,
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import MOCK_DATA from '@constants/MOCK_DATA.json';
import { useMemo } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@app/elements/icons';
import { SearchFilter } from './SearchFilter';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

type TableViewProps = {
  exportOption?: boolean;
};

const COLUMNS = [
  {
    Header: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
];

export const TableView: React.FC<TableViewProps> = ({
  exportOption = false,
}) => {
  const columns = useMemo<Column[]>(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { globalFilter, pageIndex },
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <SearchFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
        exportOption={exportOption}
      />

      <div className="overflow-x-auto overflow-y-hidden border-b border-gray-200 shadow sm:rounded-lg">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200 overflow-x-scroll rounded-md"
        >
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="group px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-700"
                  >
                    <span className="flex">
                      {column.render('Header')}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ChevronDownIcon className="ml-1 h-4 w-4 flex-shrink-0" />
                        ) : (
                          <ChevronUpIcon className="ml-1 h-4 w-4 flex-shrink-0" />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 text-gray-800"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between bg-gray-100 py-4">
        <span></span>
        <div className="flex items-center space-x-6">
          <div className="text-sm text-gray-600">
            Page {pageIndex + 1} of {pageOptions.length}
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={previousPage}
              className={classNames(
                'rounded-md border border-gray-500 p-2 text-gray-700 shadow-sm',
                !canPreviousPage
                  ? 'cursor-not-allowed disabled:opacity-50'
                  : 'hover:border-emerald-500 hover:text-emerald-500'
              )}
              disabled={!canPreviousPage}
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextPage}
              disabled={!canNextPage}
              className={classNames(
                'rounded-md border border-gray-500 p-2 text-gray-700 shadow-sm',
                !canNextPage
                  ? 'cursor-not-allowed disabled:opacity-50'
                  : 'hover:border-emerald-500 hover:text-emerald-500'
              )}
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
