import { CustomPdfViewer } from '@app/components/CustomPdfViewer';
import { CustomFileIcon } from '@app/components/FileIcon';
import { useFetchDeptNoticeDetail } from '@app/services';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';

export const DeptNoticeDetailView = () => {
  const { noticeId } = useParams();
  const { deptNotice } = useFetchDeptNoticeDetail(noticeId);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-semibold">{deptNotice?.title}</h1>
        <hr className="border border-gray-300" />
        <span className="text-sm italic text-gray-600">
          Published on : {moment(deptNotice?.created_at).format('LLL')}
        </span>
        <p>{deptNotice?.content}</p>
        {deptNotice?.files && (
          <>
            <h4 className="font-semibold">File :</h4>
            <div className="flex flex-row items-center space-x-4">
              <CustomFileIcon fileName={deptNotice?.files} />
              <a
                href={`http://localhost:8000${deptNotice?.files}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {deptNotice?.files?.split('/').reverse()[0]}
              </a>
            </div>
            <span className="mt-16 font-semibold">Preview :</span>
          </>
        )}
      </div>
      {deptNotice?.files && (
        <div className="border-gray-300shadow-md mt-12 items-center border">
          <CustomPdfViewer fileName={deptNotice?.files} />
        </div>
      )}
    </div>
  );
};
