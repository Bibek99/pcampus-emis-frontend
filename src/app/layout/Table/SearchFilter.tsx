import { useEffect, useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { XIcon, SearchIcon } from '@heroicons/react/outline';
import Dropdown from '@app/components/Dropdown';
import ExportCSV from '@utils/ExportCSV';
import classNames from 'classnames';

interface SearchFilter {
  filter: any;
  setGlobalFilter: (filterValue: any) => void;
  setFilter: (columnId: any, filterValue: any) => void;
  exportOption?: boolean;
  items: any;
  selectedFlatRows: any;
  setAllFilters: any;
}

export const SearchFilter: React.FC<SearchFilter> = ({
  filter,
  setGlobalFilter,
  setFilter,
  exportOption = false,
  items,
  selectedFlatRows,
  setAllFilters,
}) => {
  const [value, setValue] = useState(filter);
  const [globalFilterState, setGlobalFilterState] = useState(true);
  const [filterIndex, setFilterIndex] = useState('');
  const [filterTagValue, setFilterTagValue] = useState<any[]>([]);
  const [filterTagKey, setFilterTagKey] = useState<any[]>([]);
  const [filterTag, setFilterTag] = useState<any[]>([]);

  const onChange = useAsyncDebounce((value) => {
    globalFilterState
      ? setGlobalFilter(value || undefined)
      : setFilter(
          items
            .filter((column: any) => !column.disableFilters)
            .map((column: any) => column.accessor)[filterIndex],
          value
        );
  }, 400);

  // const onChange = ((value: any) => {
  //   globalFilterState ?
  //     setGlobalFilter(value || undefined)
  //     : setFilter((items.filter((column: any) => !column.disableFilters)).map((column: any) => column.accessor)[filterIndex], value);
  // });
  // useEffect(() => {
  //   console.log('filterTag:', filterTag);
  //   console.log('filterTagKey:', filterTagKey);
  //   console.log('filterTagValue:', filterTagValue);
  // }, [filterTagKey && filterTagValue]);
  useEffect(() => {
    console.log(filter);
  });
  return (
    <div className="flex flex-col space-y-4 rounded-md bg-gray-200/50 p-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="relative flex w-full flex-auto items-center">
        <div className="flex w-full flex-col space-y-4">
          <div className="flex">
            <div className="relative flex w-full items-center">
              <input
                type="text"
                name="search"
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pr-6 pl-10 focus:outline-none focus:ring focus:ring-emerald-200/50"
                placeholder="Search"
                onChange={(e) => {
                  setValue(e.target.value);
                  globalFilterState ? onChange(e.target.value) : null;
                }}
                value={value}
              />
              {value ? (
                <XIcon
                  className="absolute right-2 h-4 w-4"
                  onClick={(e) => {
                    setValue('');
                    onChange('');
                  }}
                />
              ) : null}
            </div>
            <Dropdown
              items={items
                .filter((column: any) => !column.disableFilters)
                .map((column: any) => column.Header)}
              setGlobalFilterState={setGlobalFilterState}
              setFilterIndex={setFilterIndex}
              setFilterTagKey={setFilterTagKey}
              filterTagKey={filterTagKey}
              className="pl-2 pr-2"
            />
            {globalFilterState ? null : (
              <button
                type="button"
                className="rounded-md border border-emerald-500 bg-emerald-500 px-4 py-2 text-white"
                onClick={() => {
                  setGlobalFilter('');
                  value && filterTagKey
                    ? setFilterTag([
                        ...filterTag,
                        filterTagKey[filterTagKey.length - 1] + ' : ' + value,
                      ])
                    : null;
                  onChange(value);
                  setValue('');
                }}
              >
                <SearchIcon className="h-6 w-6" />
              </button>
            )}
            <SearchIcon className="absolute top-3 left-3 h-5 w-5 text-emerald-500" />

            <div className="flex flex-auto">
              {exportOption && (
                <button
                  type="button"
                  disabled={!selectedFlatRows.length}
                  className={classNames(
                    'ml-4 w-full rounded-md border border-emerald-500 bg-gray-50 px-6 py-2 text-emerald-500',
                    !selectedFlatRows.length && 'cursor-not-allowed'
                  )}
                >
                  <ExportCSV
                    data={selectedFlatRows.map((row: any) => row.original)}
                    items={items}
                    className={classNames(
                      !selectedFlatRows.length &&
                        'pointer-events-none cursor-not-allowed'
                    )}
                  />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-row text-sm text-emerald-600 ">
            {filterTag.map((value: any, index: any) => {
              return (
                <div
                  key={index}
                  className="relative flex flex-row items-center space-x-2  rounded-lg border border-gray-100 bg-emerald-100 px-2 py-1 hover:cursor-default hover:border-gray-300"
                >
                  <span>{value}</span>
                  <XIcon
                    id={index}
                    className="h-3 w-3 cursor-pointer text-black"
                    onClick={(e) => {
                      const id = Number((e.target as HTMLTextAreaElement).id);
                      const header = filterTag[id]
                        .substring(0, filterTag[id].indexOf(':'))
                        .slice(0, -1);
                      const accessor = items.filter(
                        (item: any) => item.Header === header
                      )[0].accessor;

                      setFilterTag((filtertag) =>
                        filtertag.filter((_, i) => i !== id)
                      );

                      setFilter(accessor, '');
                      if (filterTag.length === 1) {
                        setAllFilters([]);
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
