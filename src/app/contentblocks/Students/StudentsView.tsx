import { AddUserIcon, SearchIcon } from '@app/elements/icons';
import { Link } from 'react-router-dom';

export const StudentsView: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Students</h1>
        <Link
          to="add"
          className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
        >
          <span>
            <AddUserIcon className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Add Student</span>
        </Link>
      </div>
      <hr className="border border-gray-300" />
      <div className="flex flex-col">
        <div className="flex space-x-4 rounded-md bg-gray-200/50 p-4">
          <div className="relative flex w-full flex-auto items-center">
            <input
              type="text"
              name="search"
              className="w-full rounded-md rounded-r-none border border-r-0 border-gray-300 bg-gray-50 py-2 pr-6 pl-10 focus:outline-none focus:ring-2"
              placeholder="Search by name"
            />
            <button
              type="button"
              className="rounded-r-md bg-emerald-500 px-4 py-2 text-white"
            >
              <SearchIcon />
            </button>
            <SearchIcon className="absolute top-3 left-2 h-5 w-5 text-gray-400" />
          </div>
          <button
            type="button"
            className="rounded-md border border-emerald-500 bg-gray-50 px-6 text-emerald-500"
          >
            Filter
          </button>
          <button
            type="button"
            className="rounded-md border border-emerald-500 bg-gray-50 px-6 text-emerald-500"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};
