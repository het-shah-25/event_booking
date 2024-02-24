import React from "react";

const CreateEvent = () => {
  return (
    <form className="max-w-sm mx-auto">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Add a new Event
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Event Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type Event name"
            required=""
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="numberofseats"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Number of Seats
          </label>
          <input
            type="number"
            name="numberofseats"
            id="numberofseats"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Enter number of seats"
            required=""
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="₹2999"
            required=""
          />
        </div>
        {/* Event Date */}
        <div>
          <label
            htmlFor="event-date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Event Date
          </label>
          <input
            type="date"
            id="event-date"
            name="event-date"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        {/* Event Time */}
        <div>
          <label
            htmlFor="event-time"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Event Time
          </label>
          <input
            type="time"
            id="event-time"
            name="event-time"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        {/* Artist Name */}
        <div>
          <label
            htmlFor="artist-name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Artist Name
          </label>
          <input
            type="text"
            id="artist-name"
            name="artist-name"
            placeholder="Artist Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        {/* Artist Description */}
        <div>
          <label
            htmlFor="artist-description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Artist Description
          </label>
          <textarea
            id="artist-description"
            name="artist-description"
            rows="4"
            placeholder="About the Artist"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          ></textarea>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="artist-image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Artist Image
          </label>
          <div className="flex w-full p-1 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus-within:ring-primary-600 focus-within:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus-within:ring-primary-500 dark:focus-within:border-primary-500">
            <input
              type="file"
              name="artist-image"
              id="artist-image"
              accept="image/png, image/jpeg"
              className="w-full p-1 bg-transparent border-none focus:ring-0"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="banner-image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Banner Image
          </label>
          <div className="flex w-full p-1 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus-within:ring-primary-600 focus-within:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus-within:ring-primary-500 dark:focus-within:border-primary-500">
            <input
              type="file"
              name="banner-image"
              id="banner-image"
              accept="image/png, image/jpeg"
              className="w-full p-1 bg-transparent border-none focus:ring-0"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="poster-image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Poster Image
          </label>
          <div className="flex w-full p-1 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus-within:ring-primary-600 focus-within:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus-within:ring-primary-500 dark:focus-within:border-primary-500">
            <input
              type="file"
              name="poster-image"
              id="poster-image"
              accept="image/png, image/jpeg"
              className="w-full p-1 bg-transparent border-none focus:ring-0"
            />
          </div>
        </div>

        {/* Google Map URL */}
        <div>
          <label
            htmlFor="google-map-url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Google Map URL
          </label>
          <input
            type="url"
            id="google-map-url"
            name="google-map-url"
            placeholder="Google Map URL"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option selected="">Select category</option>
            <option value="TV">Conference</option>
            <option value="PC">Workshop</option>
            <option value="GA">Symposium</option>
            <option value="PH">Meetup</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={8}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Your description here"
            defaultValue={""}
          />
        </div>
      </div>
      <div className="pt-5">
        <button
          type="submit"
          class="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add Event
        </button>
      </div>
    </form>
  );
};

export default CreateEvent;
