import { CloseIcon } from '@app/elements/icons';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface Modal {
  title: string;
  description: ReactNode | string;
  isOpen: boolean;
  setOpen(arg: boolean): void;
  primaryButton?: ReactNode;
  secondaryButton?: ReactNode;
}

export const Modal: React.FC<Modal> = ({
  isOpen,
  setOpen,
  title,
  description,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-20 overflow-y-auto"
      >
        <div className="flex min-h-screen items-center justify-center">
          <Dialog.Overlay className="fixed inset-0 bg-gray-800 opacity-10" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="z-40 mx-auto flex max-w-md flex-col space-y-6 rounded-lg bg-white p-6">
              <Dialog.Title className="flex justify-between">
                <span className="text-lg font-semibold">{title}</span>
                <button type="button" onClick={() => setOpen(false)}>
                  <CloseIcon />
                </button>
              </Dialog.Title>
              <hr />
              <Dialog.Description>{description}</Dialog.Description>
              <hr />

              <div className="flex items-center justify-center space-x-4 ">
                {primaryButton}
                {secondaryButton}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
