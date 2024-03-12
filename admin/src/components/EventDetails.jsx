import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from URL parameters
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.theeventera.live/api/events/details/${id}`
        );
        setEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]); // Dependency array with ID to refetch if ID changes

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <form className="max-w-sm mx-auto">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Event Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="event_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Event Name
          </label>
          <input
            type="text"
            name="event_name" // Change this line
            id="event_name" // It's a good practice to also change the id to match the name
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type Event name"
            value={eventDetails.event_name}
          />
        </div>
        <img
          src={`https://api.theeventera.live/${eventDetails.poster_img}`}
          className="h-auto max-w-lg rounded-lg"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: eventDetails.google_map_url }} />
    </form>
  );
};

export default EventDetails;
