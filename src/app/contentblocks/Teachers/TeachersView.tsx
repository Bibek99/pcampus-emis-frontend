import { AddUserIcon } from '@app/elements/icons';
import { Link } from 'react-router-dom';

export const TeachersView: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Teachers</h1>
        <Link
          to="add"
          className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
        >
          <span>
            <AddUserIcon className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Add Teacher</span>
        </Link>
      </div>
    </div>
  );
};
