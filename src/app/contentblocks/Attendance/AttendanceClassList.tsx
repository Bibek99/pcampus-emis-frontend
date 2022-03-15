import { useAuthContext } from '@app/auth/AuthContext';
import { SimpleCard } from '@app/components/Card';
import { RoleBasedRenderer } from '@app/router/guards';
import { useDeleteClass, useFetchClass } from '@app/services';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AttendanceClassList = () => {
    const { role } = useAuthContext();
    const { authenticatedUser } = useAuthContext();
    const userId = String(authenticatedUser?.id);
    const { classData, isLoading } = useFetchClass(role, userId);

    const queryClient = useQueryClient();

    if (isLoading) {
        return <div>Loading</div>;
    }
    return (
        <div className="flex flex-col space-y-6 p-6">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-semibold">Attendance</h1>

            </div>
            <hr className="border border-gray-300" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {classData?.map((classobj: any, index: number) => (
                    <div className="group relative">
                        <Link key={index} to={`${classobj.alias}-${classobj.id}`}>
                            <SimpleCard data={classobj} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
