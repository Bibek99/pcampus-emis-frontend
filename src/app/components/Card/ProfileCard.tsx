import React from 'react';
import Image from 'next/image';
import { avatarSVG } from '@utils/avatarSVG';

interface ProfileCard {
    studentProfileData: any;
}

export const ProfileCard: React.FC<ProfileCard> = ({ studentProfileData }) => {
    console.log('studentProfileData', studentProfileData);

    return (
        <div className="flex flex-col space-y-4 rounded-lg bg-gray-50 p-6">
            <h4 className="text-lg font-medium">{"Your Profile"}</h4>
            <hr className="border-gray-300" />
            <div className="p-8">
                <div className="flex items-center space-x-6">
                    <div>
                        <Image
                            src={avatarSVG(studentProfileData?.full_name)}
                            height={164}
                            width={164}
                            className="rounded-full"
                        />
                    </div>
                    <div className="flex flex-row items-center space-x-32 divide-x-2 divide-gray-300">
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold uppercase">
                                {studentProfileData?.full_name}
                            </h3>
                            <p className="text-gray-600">{studentProfileData?.rollno}</p>
                        </div>
                        <div className="pl-12">
                            <table className="">
                                <tbody>
                                    <tr>
                                        <td className="px-2 py-1 text-gray-500 font-semibold">Address</td>
                                        <td className="px-2 py-1">{studentProfileData?.student.address}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-1 text-gray-500 font-semibold">Phone</td>
                                        <td className="px-2 py-1">{studentProfileData?.student.phone}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-1 text-gray-500 font-semibold">Date of Birth</td>
                                        <td className="px-2 py-1">{studentProfileData?.student.dob}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-1 text-gray-500 font-semibold">Department</td>
                                        <td className="px-2 py-1">{studentProfileData?.department.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-1 text-gray-500 font-semibold">Batch</td>
                                        <td className="px-2 py-1">{studentProfileData?.batch.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-1 text-gray-500 font-semibold">Section</td>
                                        <td className="px-2 py-1">{studentProfileData?.section.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};