import React from 'react';
import NextLink from 'next/link';

const Error404 = () => {
  return (
    <div className="mx-auto max-w-3xl px-8">
      <div className="flex min-h-screen flex-col justify-center gap-6">
        <h1 className="text-3xl font-bold md:text-5xl">Page Not Found</h1>
        <p className="text-gray-700">
          There appears that you came across a page which used to exist here
          before or you have mis-spelled the url. Please make sure your url is
          correct or return back.
        </p>
        <NextLink href={'/'}>
          <a className="flex max-w-xs justify-center rounded-lg bg-gray-200 py-3 px-6 font-semibold hover:bg-gray-300">
            Return to Home
          </a>
        </NextLink>
      </div>
    </div>
  );
};

export default Error404;
