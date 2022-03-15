import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateAttendance, useFetchAllAttendance } from '@app/services/attendance.service';
import { useAuthContext } from '@app/auth/AuthContext';
import { AddUserIcon } from '@app/elements/icons';
import { ColumnFilter, TableView } from '@app/layout';
import { useGetStudents } from '@app/services/user.service';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFetchStudentsInAClass } from '@app/services';

const columns = [
  {
    Header: 'Image',
    accessor: 'images',
    Cell: ({ row }: { row: any }) => {
      return row.values.images ? (
        <Image
          src={`http://localhost:8000${row.values.images}`}
          height={48}
          width={48}
          className="rounded-full"
        />
      ) : (
        <span></span>
      );
    },
    disableFilters: true
  },
  {
    Header: 'Roll no.',
    accessor: 'rollno',

  },
  {
    Header: 'Name',
    accessor: 'full_name',

  },
  {
    Header: 'id',
    accessor: 'id',
  },
];

const initialState = { hiddenColumns: ['id'] };


const attendanceRecordSchema = Yup.object().shape({});

export const AttendanceRecord: React.FC = () => {
  const { id } = useParams();
  const { authenticatedUser } = useAuthContext();
  const userId = String(authenticatedUser?.id);
  const { students, isLoading } = useFetchStudentsInAClass(id);
  const [selectAbsentees, setSelectAbsentees] = useState<boolean>(true);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const navigate = useNavigate();
  const { mutate: createAttendance } = useCreateAttendance({
    onError: () => {
      toast.error('Attendance Record Error!');
    },
    onSuccess: () => {
      toast.success('Attendance Recorded successfully!');
      navigate('../');
    },

  },
    id,
  );

  const attendanceRecordForm = useFormik({
    initialValues: {
      date: '',
    },
    validationSchema: attendanceRecordSchema,
    onSubmit: (values) => {
      const selectedList = selectedRows.map((row) => row.original.id);

      const absentList = selectAbsentees ?
        selectedList
        :
        (students.map((student: any) => student.id)).filter((id: any) => !(selectedList.includes(id)));

      let attendanceRecord =
      {
        date: '2012-11-12',
        absent_list: [...absentList]
      }
      createAttendance(attendanceRecord as any);
    },
  });


  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex flex-col space-y-6">
      <form
        onSubmit={attendanceRecordForm.handleSubmit}
      // onSubmit={(e) => { e.preventDefault; console.log("selectedRows=", selectedRows); }}
      >
        <div className="flex flex-col space-y-4 ">
          <div className="flex justify-center">
            <div className='flex space-x-4'>
              <div
                className={classNames("form-check border border-gray-300 rounded-lg p-2 hover:cursor-pointer", selectAbsentees ? 'bg-emerald-100/30 text-emerald-600' : '')}
                onClick={() => setSelectAbsentees(true)}
              >
                <input
                  className={classNames("form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-emerald-500 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", selectAbsentees ? 'ring ring-emerald-200 ring-opacity-50 ring-offset-0' : '')}
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1 "
                  checked={selectAbsentees} />
                <span
                  className="form-check-label inline-block"  >
                  Select Absentees
                </span>
              </div>
              <div
                className={classNames("form-check border border-gray-300 rounded-lg p-2 hover:cursor-pointer", !selectAbsentees ? 'bg-emerald-100/30 text-emerald-600' : '')}
                onClick={() => setSelectAbsentees(false)}
              >
                <input
                  className={classNames("form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-emerald-500 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", !selectAbsentees ? 'ring ring-emerald-200 ring-opacity-50 ring-offset-0' : '')}
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked={!selectAbsentees} />
                <span
                  className="form-check-label inline-block"  >
                  Select Attendees
                </span>
              </div>
            </div>
          </div>
          <TableView pagesize={48} exportOption={false} tableData={students} columnData={columns} setSelectedRows={setSelectedRows} initialState={initialState} />
          <div className="mt-6 flex w-full justify-center"
          >
            <button
              type="submit"
              className="w-full rounded-md bg-emerald-500 py-2 px-6 text-gray-50 sm:w-32"
            >
              Submit
            </button>
          </div>
          {/* <p>Data: </p>
          <pre>
            <code>
              {JSON.stringify(
                {
                  selectedRows: selectedRows.map((row) => row.original),
                },
                null,
                2,
              )}
            </code>
          </pre> */}
        </div>
      </form>
    </div >
  );
};
