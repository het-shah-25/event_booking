import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/events/eventlist"
        ); // Update with your actual API URL
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Handle error (e.g., display a message)
      }
    };

    fetchEvents();
  }, []);
  const handleUpdateStatus = async (event) => {
    if (event.status === "activate") {
      message.warn("Event is already activated.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/events/update-status/${event._id}`
      );
      message.success("Event activated successfully.");
      setTimeout(() => {
        // Refresh the event list after a successful status update
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Failed to update event status:", error);
      message.error(
        error.response?.data?.message || "Failed to update event status."
      );
    }
  };
  function MaterialSymbolsDeleteOutlineSharp(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fill="currentColor"
          d="M5 21V6H4V4h5V3h6v1h5v2h-1v15zm2-2h10V6H7zm2-2h2V8H9zm4 0h2V8h-2zM7 6v13z"
        ></path>
      </svg>
    );
  }
  const deleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `https://api.theeventera.live/api/events/delete/${eventId}`
      );
      if (response.status === 200) {
        message.success("Event deleted successfully");

        // Wait for 2 seconds before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        // If you prefer to re-fetch the events without reloading the entire page,
        // simply call fetchEvents() here without the timeout and page reload.
        fetchEvents();
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
      message.error(error.response?.data?.message || "Failed to delete event");
    }
  };
  return (
    <div>
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
                  {event.event_name}
                </td>
                <td className="px-6 py-4">{event.event_date}</td>
                <td className="px-6 py-4">{event.category}</td>
                <td className="px-6 py-4">
                  {event.status === "activate" ? (
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      disabled
                    >
                      Activated
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(event)}
                      type="button"
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      InActivated
                    </button>
                  )}
                </td>{" "}
                <td className="px-6 py-4">
                  <button
                    onClick={() => navigate(`/event-details/${event._id}`)}
                    type="button"
                    style={{ backgroundColor: "#ED5858", color: "white" }} // Add this line for the normal state
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#D45050")
                    } // Darken on hover
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ED5858")
                    } // Revert on mouse out
                    class="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-blue-800"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => deleteEvent(event._id)} // Use the event's ID
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex items-center gap-2"
                  >
                    <MaterialSymbolsDeleteOutlineSharp className="w-4 h-4" />{" "}
                  </button>
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
