import {
  Column,
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  useRowSelect,
  usePagination,
} from 'react-table';
import { useEffect, useMemo } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@app/elements/icons';
import { SearchFilter } from './SearchFilter';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { ColumnFilter } from './ColumnFilter';
import Checkbox from './Checkbox';

type TableViewProps = {
  exportOption?: boolean;
  tableData?: Array<any>;
  columnData?: Array<any>;
  pagesize?: number;
  setSelectedRows?: any;
  initialState?: any;
  searchOption?: boolean;
  paginationOption?: boolean;
};

export const TableView: React.FC<TableViewProps> = ({
  exportOption = false,
  pagesize = 10,
  tableData,
  columnData,
  setSelectedRows,
  initialState,
  searchOption = true,
  paginationOption = true,
}) => {
  const columns = useMemo<any>(() => columnData, []);
  const data = useMemo<any>(() => tableData, [tableData]);
  const defaultColumn = useMemo<any>(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    getToggleAllRowsSelectedProps,
    headerGroups,
    page,
    prepareRow,
    state: { globalFilter, pageIndex, pageSize },
    setGlobalFilter,
    setFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    selectedFlatRows,
    setAllFilters,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: initialState,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );
  setSelectedRows ? setSelectedRows(selectedFlatRows) : null;
  useEffect(() => {
    setPageSize(pagesize);
  }, []);
  if (!data) {
    return <h1>loading</h1>;
  }
  return (
    <>
      {searchOption && (
        <SearchFilter
          filter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          setFilter={setFilter}
          exportOption={exportOption}
          items={columns}
          selectedFlatRows={selectedFlatRows}
          setAllFilters={setAllFilters}
        />
      )}

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
                    <span className="flex ">
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
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
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
          {/* <p>Data: </p>
          <pre>
            <code>
              {JSON.stringify(
                {
                  selectedFlatRows: selectedFlatRows.map((row) => row.original),
                },
                null,
                2,
              )}
            </code>
          </pre> */}
        </table>
      </div>
      {paginationOption && (
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
      )}
    </>
  );
};
