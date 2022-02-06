import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { SearchIcon } from '@heroicons/react/outline';

interface SearchFilter {
  filter: any;
  setFilter: (filterValue: any) => void;
}

export const SearchFilter: React.FC<SearchFilter> = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 400);

  return (
    <div className="flex flex-col space-y-4 rounded-md bg-gray-200/50 p-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="relative flex w-full flex-auto items-center">
        <input
          type="text"
          name="search"
          className="w-full rounded-md rounded-r-none border border-r-0 border-gray-300 bg-gray-50 py-2 pr-6 pl-10 focus:outline-none focus:ring focus:ring-emerald-200/50"
          placeholder="Search by name"
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          value={value}
        />
        <button
          type="button"
          className="rounded-r-md border border-emerald-500 bg-emerald-500 px-4 py-2 text-white"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
        <SearchIcon className="absolute top-3 left-3 h-5 w-5 text-emerald-500" />
      </div>
      <div className="flex flex-auto space-x-4">
        <button
          type="button"
          className="w-full rounded-md border border-emerald-500 bg-gray-50 px-6 py-2 text-emerald-500"
        >
          Filter
        </button>
        <button
          type="button"
          className="w-full rounded-md border border-emerald-500 bg-gray-50 px-6 py-2 text-emerald-500"
        >
          Export
        </button>
      </div>
    </div>
  );
};
