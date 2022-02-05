import { HomeIcon } from '@app/elements/icons';
import classNames from 'classnames';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const BreadCrumb = () => {
  const routeSegments = useLocation().pathname.split('/').filter(Boolean);

  return (
    <div className="mb-4 flex w-full items-center space-x-2 text-sm">
      <Link to="/">
        <HomeIcon className="h-4 w-4 hover:text-emerald-600" />
      </Link>
      <span>/</span>
      {routeSegments.map((segment, index) => (
        <Fragment key={index}>
          <Link
            to={segment}
            className={classNames(
              'hover:text-emerald-600',
              index === routeSegments.length - 1 ? 'text-emerald-600' : ''
            )}
          >
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </Link>
          <span
            className={index < routeSegments.length - 1 ? 'visible' : 'hidden'}
          >
            /
          </span>
        </Fragment>
      ))}
    </div>
  );
};
