import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import React from 'react';

const PreviousButton = ({ page, pages, handlePrevClick }: any) => {
  return (
    <ChevronLeftIcon
      className={classNames(
        'h-6 w-6 cursor-pointer',
        page === 1 ? 'cursor-not-allowed opacity-50' : ''
      )}
      onClick={handlePrevClick}
    />
  );
};

const NextButton = ({ page, pages, handleNextClick }: any) => {
  return (
    <ChevronRightIcon
      className={classNames(
        'h-6 w-6 cursor-pointer',
        page === pages ? 'cursor-not-allowed opacity-50' : ''
      )}
      onClick={handleNextClick}
    />
  );
};

export const CustomNavigation = (props: any) => {
  const { page, pages, handlePrevClick, handleNextClick } = props;
  return (
    <div className="flex flex-row items-center justify-center space-x-6 rounded-md bg-gray-900 p-6 text-white">
      <PreviousButton
        page={page}
        pages={pages}
        handlePrevClick={handlePrevClick}
      />
      <span className="text-sm">
        Page {page} / {pages}
      </span>
      <NextButton page={page} pages={pages} handleNextClick={handleNextClick} />
    </div>
  );
};
