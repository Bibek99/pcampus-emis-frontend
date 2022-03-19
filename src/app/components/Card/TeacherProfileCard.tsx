import { avatarSVG } from '@utils/avatarSVG';
import Image from 'next/image';
import React from 'react';

interface TeacherProfileCardProps {
  teacherProfileData: any;
}

export const TeacherProfileCard: React.FC<TeacherProfileCardProps> = ({
  teacherProfileData,
}) => {
  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-gray-50 p-6">
      <h4 className="text-lg font-medium">{'Your Profile'}</h4>
      <hr className="border-gray-300" />
      <div className="p-8">
        <div className="flex items-center space-x-6">
          <div>
            <Image
              src={avatarSVG(teacherProfileData?.teacher.first_name)}
              height={164}
              width={164}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-row items-center space-x-32 divide-x-2 divide-gray-300">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold uppercase">
                {teacherProfileData?.teacher.first_name}{' '}
                {teacherProfileData?.teacher.middle_name}{' '}
                {teacherProfileData?.teacher.last_name}
              </h3>
              {/* <p className="text-gray-600">{teacherProfileData?.rollno}</p> */}
            </div>
            <div className="pl-12">
              <table className="">
                <tbody>
                  <tr>
                    <td className="px-2 py-1 font-semibold text-gray-500">
                      Address
                    </td>
                    <td className="px-2 py-1">
                      {teacherProfileData?.teacher.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 font-semibold text-gray-500">
                      Phone
                    </td>
                    <td className="px-2 py-1">
                      {teacherProfileData?.teacher.phone}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 font-semibold text-gray-500">
                      Date of Birth
                    </td>
                    <td className="px-2 py-1">
                      {teacherProfileData?.teacher.dob}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 font-semibold text-gray-500">
                      Department
                    </td>
                    <td className="px-2 py-1">
                      {teacherProfileData?.department.name}
                    </td>
                  </tr>
                  {/* <tr>
                    <td className="px-2 py-1 font-semibold text-gray-500">
                      Batch
                    </td>
                     <td className="px-2 py-1">
                      {teacherProfileData?.batch.name}
                    </td>
                  </tr> */}
                  {/* <tr>
                    <td className="px-2 py-1 font-semibold text-gray-500">
                      Section
                    </td>
                    <td className="px-2 py-1">
                      {teacherProfileData?.section.name}
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
