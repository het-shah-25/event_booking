import React from "react";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  // Sample events data
  const events = [
    {
      name: "Tech Conference 2024",
      date: "2024-03-27",
      category: "Conference",
      status: "Scheduled",
    },
    {
      name: "Web Development Workshop",
      date: "2024-04-15",
      category: "Workshop",
      status: "Scheduled",
    },
    {
      name: "Artificial Intelligence Symposium",
      date: "2024-05-22",
      category: "Symposium",
      status: "Scheduled",
    },
    {
      name: "Blockchain Expo",
      date: "2024-06-30",
      category: "Expo",
      status: "Scheduled",
    },
    {
      name: "Virtual Reality Meetup",
      date: "2024-07-18",
      category: "Meetup",
      status: "Scheduled",
    },
  ];
  const navigate = useNavigate();

  return (
    <div>
      {/* Create Event Button */}
      <div className="mb-4 text-right">
        <button
          type="button"
          onClick={() => navigate("/create-event")}
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Create Event
        </button>
      </div>

      {/* Event List Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Event Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b dark:border-gray-700`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {event.name}
                </td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">{event.category}</td>
                <td className="px-6 py-4">{event.status}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
