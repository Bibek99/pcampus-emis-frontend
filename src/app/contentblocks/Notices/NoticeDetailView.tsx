import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchGlobalNoticeDetail } from '@app/services';
import { DefaultExtensionType } from 'react-file-icon';
import { CustomPdfViewer } from '@app/components/CustomPdfViewer';
import { CustomFileIcon } from '@app/components/FileIcon';

export const NoticeDetailView = () => {
  const { noticeId } = useParams();
  const { globalNotice } = useFetchGlobalNoticeDetail(noticeId);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-semibold">{globalNotice?.title}</h1>
        <hr className="border border-gray-300" />
        <span className="text-sm italic text-gray-600">
          Published on : {moment(globalNotice?.created_at).format('LLL')}
        </span>
        <p>{globalNotice?.content}</p>
        {globalNotice?.files && (
          <>
            <h4 className="font-semibold">File :</h4>
            <div className="flex flex-row items-center space-x-4">
              <CustomFileIcon fileName={globalNotice?.files} />
              <a
                href={`http://localhost:8000${globalNotice?.files}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {globalNotice?.files?.split('/').reverse()[0]}
              </a>
            </div>
            <span className="mt-16 font-semibold">Preview :</span>
          </>
        )}
      </div>
      {globalNotice?.files && (
        <div className="border-gray-300shadow-md mt-12 items-center border">
          <CustomPdfViewer fileName={globalNotice?.files} />
        </div>
      )}
    </div>
  );
};
