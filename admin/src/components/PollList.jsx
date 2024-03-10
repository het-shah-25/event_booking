import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/polls/fetch-polls"
        );
        setPolls(response.data);
      } catch (error) {
        console.error("Failed to fetch polls:", error);
      }
    };

    fetchPolls();
  }, []);
  const deletePoll = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/polls/delete-poll/${id}`);
      // Show success message
      message.success("Poll deleted successfully", 2.5);
      // Refresh the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Failed to delete poll:", error);
      // Show error message
      message.error("Failed to delete the poll");
    }
  };

  return (
    <div>
      <div className="mb-4 text-right">
        <button
          type="button"
          onClick={() => navigate("/create-poll")}
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Create Poll
        </button>
      </div>
      {/* Event List Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Poll Name{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Date
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
            {polls.map((poll) => (
              <tr
                key={poll._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{poll.poll_question}</td>
                <td className="px-6 py-4">
                  {new Date(poll.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{poll.poll_status}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/polls/${poll._id}`)}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => deletePoll(poll._id)}
                    type="button"
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </td>{" "}
                {/* Placeholder for action buttons */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PollList;
