import { useAuthContext } from '@app/auth/AuthContext';
import { CustomTextInput } from '@app/components/Forms';
import { useCreateFolder } from '@app/services';
import { useFormik } from 'formik';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const createFolderSchema = Yup.object().shape({
  folder_name: Yup.string().required('Folder name is required'),
});

export const CreateFolderForm = ({
  setOpen,
}: {
  setOpen: (arg: boolean) => void;
}) => {
  const { id } = useParams();
  const { authenticatedUser } = useAuthContext();
  const userId = String(authenticatedUser?.id);

  const queryClient = useQueryClient();

  const { mutate: createFolder } = useCreateFolder(
    {
      onError: () => {
        toast.error('Folder create Error!');
      },
      onSuccess: () => {
        toast.success('Folder created successfully!');
        queryClient.invalidateQueries(['fetch-folders', id]);
        setOpen(false);
      },
    },
    id,
    userId
  );

  const createFolderForm = useFormik({
    initialValues: {
      folder_name: '',
    },
    validationSchema: createFolderSchema,
    onSubmit: (values) => {
      const folder = {
        ...values,
      };
      createFolder(folder);
    },
  });

  return (
    <form
      onSubmit={createFolderForm.handleSubmit}
      className="mx-auto flex w-full flex-col space-y-4"
    >
      <p className="text-sm italic text-gray-600">
        Fill the form below to create a folder.
      </p>
      <CustomTextInput
        required
        label="Folder Name"
        name="folder_name"
        onChange={createFolderForm.handleChange}
        onBlur={createFolderForm.handleBlur}
        error={createFolderForm.errors.folder_name}
      />
      <hr />
      <div className="mt-6 flex w-full justify-center space-x-4">
        <button
          type="submit"
          className="w-full rounded-md bg-emerald-500 py-2 px-6 text-gray-50 sm:w-32"
        >
          Create
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="w-full rounded-md border-2 border-red-500 bg-gray-50 py-2 px-6 text-red-500 sm:w-32"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
