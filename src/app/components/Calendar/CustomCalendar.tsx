import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

function chunk(array: number[], size: number) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunkedArray[chunkedArray.length - 1];
    if (!last || last.length === size) {
      chunkedArray.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunkedArray;
}

export const CustomCalendar = () => {
  const weekdayshort = moment.weekdaysMin();
  const startOfMonth = moment().startOf('month').format('dd');
  const monthYear = moment().format('LL');
  const today = moment().format('D');
  const daysInMonth = Array.from(
    Array(moment(new Date()).daysInMonth()),
    (_, i) => i + 1
  );

  for (let i in weekdayshort) {
    if (weekdayshort[i] !== startOfMonth) {
      daysInMonth.unshift(0);
    } else {
      break;
    }
  }

  const daysData = chunk(daysInMonth, 7);
  console.log(daysData);

  return (
    <>
      <div className="flex items-center justify-center rounded-lg">
        <div className="w-full">
          <div className="rounded-lg rounded-t bg-white dark:bg-gray-800 md:p-6 md:pb-12">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {monthYear}
              </h1>
            </div>
            <div className="flex items-center justify-between overflow-x-auto pt-12">
              <table className="w-full">
                <thead>
                  <tr>
                    {weekdayshort.map((day, index) => (
                      <th key={index}>
                        <div className="flex w-full justify-center">
                          <p className="text-center font-medium text-gray-800 dark:text-gray-100">
                            {day}
                          </p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {daysData.map((week, index) => (
                    <tr key={index}>
                      {week.map((day, index) =>
                        !day ? (
                          <td key={index} className="pt-2">
                            <div className="flex w-full cursor-pointer justify-center py-2" />
                          </td>
                        ) : (
                          <td key={index} className="pt-2">
                            <div className="flex w-full cursor-pointer justify-center py-2">
                              <p
                                className={classNames(
                                  'font-medium  dark:text-gray-100',
                                  Number(today) === day
                                    ? 'flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-medium text-white'
                                    : 'text-gray-500'
                                )}
                              >
                                {day}
                              </p>
                            </div>
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
