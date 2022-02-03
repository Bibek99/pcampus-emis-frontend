import React from 'react';
import NextLink from 'next/link';

const Error404: React.FC<{}> = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-8">
        <h1 className="text-dark dark:font-white text-3xl font-bold md:text-5xl">
          Page Not Found
        </h1>
        <p className="text-gray-700 dark:text-gray-200">
          There appears that you came across a page which used to exist here
          before or you have mis-spelled the url. Please make sure your url is
          correct or return back.
        </p>
        <NextLink href={'/'}>
          <a className="flex max-w-xs justify-center rounded-lg bg-gray-200 py-3 px-6 font-semibold hover:bg-gray-300 dark:bg-gray-700 hover:dark:bg-gray-800">
            Return to Home
          </a>
        </NextLink>
      </div>
    </div>
  );
};

export default Error404;
