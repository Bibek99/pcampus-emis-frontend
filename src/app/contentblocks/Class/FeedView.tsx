import { CustomTextArea } from '@app/components/Forms/TextArea';
import React from 'react';

export const FeedItem = () => {
  return (
    <div className="flex w-full space-x-4 pt-4">
      <div>Avatar</div>
      <div>Someone posted about the assignment.</div>
    </div>
  );
};

export const FeedCreate = () => {
  return (
    <div className="mb-8 flex space-x-4">
      <div>Avatar</div>
      <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4">
        <div className="flex-auto">
          <CustomTextArea label="" placeholder="Enter text" name="post" />
        </div>
        <button
          type="submit"
          className="h-12 w-20 rounded-md bg-emerald-500 px-6 py-2 text-white"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export const FeedView = () => {
  return (
    <>
      <FeedCreate />

      <div className="flex flex-col space-y-6 divide-y-2">
        {[1, 2, 3].map((feed, index) => (
          <FeedItem key={index} />
        ))}
      </div>
    </>
  );
};
