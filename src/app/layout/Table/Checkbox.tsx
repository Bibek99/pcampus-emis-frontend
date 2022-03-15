import React, { useEffect, forwardRef, MutableRefObject } from 'react';

interface Props {
  indeterminate?: boolean;
}

const useCombinedRefs = (...refs: any): MutableRefObject<any> => {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach((ref: any) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {

    const defaultRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, defaultRef);

    React.useEffect(() => {
      if (combinedRef?.current) {
        combinedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [combinedRef, indeterminate]);


    return (
      <div className='w-4'>
        <input type="checkbox"
          className="form-checkbox h-4 w-4 rounded text-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 focus:ring-offset-0"
          ref={combinedRef} {...rest} />
      </div>
    );
  },
);

export default Checkbox;
