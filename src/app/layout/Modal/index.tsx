import { CloseIcon } from '@app/elements/icons';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, ReactNode } from 'react';
import { Loader } from '..';

interface Modal {
  title: string;
  description: ReactNode | string;
  isOpen: boolean;
  setOpen(arg: boolean): void;
  primaryButton?: ReactNode;
  secondaryButton?: ReactNode;
  isLoading?: boolean;
}

export const Modal: React.FC<Modal> = ({
  isOpen,
  setOpen,
  title,
  description,
  primaryButton,
  secondaryButton,
  isLoading,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-20 overflow-y-auto"
      >
        <div className="flex min-h-screen items-center justify-center">
          <Dialog.Overlay className="pointer-events-none fixed inset-0 bg-gray-800 opacity-10" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative z-40 mx-auto flex max-w-md flex-col space-y-6 rounded-lg bg-white p-6">
              <Dialog.Title
                className={classNames(
                  'flex justify-between',
                  isLoading ? 'pointer-events-none' : ''
                )}
              >
                <span className="text-lg font-semibold">{title}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (!isLoading) {
                      setOpen(false);
                    }
                  }}
                >
                  <CloseIcon />
                </button>
              </Dialog.Title>
              <hr />
              {description}

              {primaryButton ||
                (secondaryButton && (
                  <div className="flex items-center justify-center space-x-4">
                    {primaryButton}
                    {secondaryButton}
                  </div>
                ))}
              {isLoading && (
                <div className="pointer-events-none absolute -top-6 left-0 z-[1000] h-full w-full bg-gray-100/50">
                  <Loader />
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
