import React, { useState } from 'react';
import { useFormik } from 'formik';
import { ChevronDownIcon, DotsVerticalIcon } from '@heroicons/react/outline';
import { CustomFileIcon } from '@app/components/FileIcon';
import classNames from 'classnames';
import * as Yup from 'yup';
import { Menu, Transition } from '@headlessui/react';
import { useMarkAssignmentSubmission } from '@app/services';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import moment from 'moment';

interface SubmissionListProps {
  submittedListData: any;
}

interface SubmissionListItemProps {
  num: number;
  submittedListItem: any;
}

export const SubmissionListItem: React.FC<SubmissionListItemProps> = ({
  submittedListItem,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const queryClient = useQueryClient();

  const { assignmentId } = useParams();

  const { mutate: markAssignmentSubmission } = useMarkAssignmentSubmission(
    {
      onError: () => {
        toast.error('Something went wrong');
      },
      onSuccess: () => {
        toast.success('Submission marked');
        queryClient.invalidateQueries(['submitted-assignment', assignmentId]);
      },
    },
    assignmentId,
    submittedListItem?.student?.id
  );

  const marksSubmitForm = useFormik({
    initialValues: {
      obtain_points: '',
    },
    validationSchema: Yup.object().shape({
      obtain_points: Yup.number(),
    }),
    onSubmit: (values) => {
      markAssignmentSubmission(values);
    },
  });

  const dateDiff = moment(submittedListItem.created_at)
    .to(moment(submittedListItem?.assignment.due_date))
    .includes('ago')
    ? {
        text: `Submitted ${moment(submittedListItem.created_at).to(
          moment(submittedListItem?.assignment.due_date),
          true
        )} late`,
        late: true,
      }
    : {
        text: `Submitted ${moment(submittedListItem.created_at).to(
          moment(submittedListItem?.assignment.due_date),
          true
        )} before time`,
        late: false,
      };

  return (
    <form onSubmit={marksSubmitForm.handleSubmit}>
      <div className="mb-6 flex flex-col space-y-6">
        <div className="flex flex-row items-center justify-between pt-4">
          <h4 className="font-medium">
            {submittedListItem?.student?.first_name}{' '}
            {submittedListItem?.student?.middle_name}{' '}
            {submittedListItem?.student?.last_name}
          </h4>
          <p
            className={classNames(
              'text-sm italic',
              dateDiff.late ? 'text-red-500' : 'text-emerald-600'
            )}
          >
            {dateDiff.text}
          </p>
          <div className="flex items-center space-x-4">
            <ChevronDownIcon
              className={classNames(
                'h-5 w-5 transition-all duration-300',
                isExpanded ? 'rotate-180' : ''
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            />
            {/* <Options form={marksSubmitForm} /> */}
          </div>
        </div>
      </div>
      {isExpanded && (
        <>
          <div className="flex flex-row items-center justify-between transition-all duration-300">
            <div className="flex flex-row items-center space-x-4">
              <CustomFileIcon fileName={submittedListItem?.student_files} />
              <a
                href={`http://localhost:8000${submittedListItem?.student_files}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {submittedListItem?.student_files?.split('/').reverse()[0]}
              </a>
            </div>
            <div>
              {submittedListItem?.marked ? (
                <span className="text-lg">
                  {submittedListItem?.obtain_points}
                </span>
              ) : (
                <input
                  type="text"
                  name="obtain_points"
                  className={classNames(
                    'w-16 appearance-none border-b border-gray-300 bg-transparent pr-2 text-right transition focus:border-b-2 focus:border-gray-500 focus:outline-none',
                    marksSubmitForm.touched.obtain_points &&
                      marksSubmitForm.errors.obtain_points
                      ? 'border-b-2 border-red-500 focus:border-b-2 focus:border-red-500'
                      : ''
                  )}
                  onChange={marksSubmitForm.handleChange}
                  onBlur={marksSubmitForm.handleBlur}
                  value={marksSubmitForm.values.obtain_points}
                />
              )}

              <span className="pl-2 text-lg text-gray-600">
                / {submittedListItem?.assignment?.total_points}
              </span>
            </div>
          </div>
          {submittedListItem?.marked ? (
            ' '
          ) : (
            <span className="flex justify-end text-xs italic text-gray-500">
              Press Enter to save
            </span>
          )}
        </>
      )}
    </form>
  );
};

export const SubmissionList: React.FC<SubmissionListProps> = ({
  submittedListData,
}) => {
  return (
    <div className="flex flex-col space-y-6">
      <h3 className="text-lg font-semibold">Submissions</h3>
      <div className="space-y-6 divide-y-2">
        {submittedListData ? (
          submittedListData.map((submittedListItem: any, index: number) => (
            <SubmissionListItem
              key={index}
              num={index}
              submittedListItem={submittedListItem}
            />
          ))
        ) : (
          <p className="italic">No Submission found for this assignment.</p>
        )}
      </div>
    </div>
  );
};

const Options = ({ form }: any) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center px-4 py-2">
          <DotsVerticalIcon className="h-5 w-5" />
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="group w-full rounded-md px-2 py-1">
              <Menu.Item>
                <button
                  type="submit"
                  className="flex items-center space-x-2 hover:text-emerald-500 disabled:cursor-not-allowed"
                  disabled={
                    form.touched.obtained_marks && form.errors.obtained_marks
                  }
                >
                  <span>Save</span>
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};
