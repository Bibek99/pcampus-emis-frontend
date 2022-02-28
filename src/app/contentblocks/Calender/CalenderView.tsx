import { useAuthContext } from '@app/auth/AuthContext';
import { useGlobalStudentCalendar } from '@app/services';
import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }: any) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });

const eventListFormatter = (calenderData: any) => {
  let events: any[] = [];
  calenderData?.map((singleEvent: any) =>
    events.push({
      id: singleEvent.id,
      class: {
        id: singleEvent.classes?.id,
        alias: singleEvent.classes?.alias,
      },
      title: singleEvent.title,
      start: singleEvent.due_date,
      end: singleEvent.due_date,
    })
  );
  return events;
};

export const CalenderView = () => {
  const { authenticatedUser } = useAuthContext();
  const userId = String(authenticatedUser?.id);

  const { calendarData } = useGlobalStudentCalendar(userId, 2, 2022);
  const events = eventListFormatter(calendarData);

  const navigate = useNavigate();

  return (
    <div className="rounded-md bg-gray-50 p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Calendar</h1>
        </div>
        <hr className="border border-gray-300" />

        <Calendar
          localizer={localizer}
          views={['month']}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          components={{
            timeSlotWrapper: ColoredDateCellWrapper,
          }}
          onSelectEvent={(e) =>
            navigate(
              `/classes/${e.class.alias}-${e.class.id}/assignments/${e.id}`
            )
          }
        />
      </div>
    </div>
  );
};
