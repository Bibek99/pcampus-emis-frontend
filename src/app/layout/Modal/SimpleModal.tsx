import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Fragment, ReactNode } from 'react';

interface SimpleModal {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
  title: string;
  children?: ReactNode;
}

export const SimpleModal: React.FC<SimpleModal> = ({
  isOpen,
  setOpen,
  title,
  children,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-[60] overflow-y-auto"
      >
        <div className="flex min-h-screen items-center justify-center">
          <Dialog.Overlay className="pointer-events-none fixed inset-0 bg-gray-800 opacity-50" />
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative z-40 mx-auto flex max-w-lg flex-col space-y-6 rounded-lg bg-white p-6">
              <Dialog.Title className="flex justify-between">
                <span className="text-lg font-semibold">{title}</span>
                <button type="button" onClick={() => setOpen(false)}>
                  <XIcon className="h-6 w-6" />
                </button>
              </Dialog.Title>
              <hr />
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
