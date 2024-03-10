import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const PollsDisplay = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/polls/fetch-polls"
      );
      setPolls(response.data);
    } catch (error) {
      console.error("Failed to fetch polls:", error);
      message.error("Failed to fetch polls");
    }
  };

  const handleVote = async (pollId, optionId) => {
    try {
      await axios.post(`http://localhost:5000/api/polls/vote/${pollId}`, {
        optionId,
      });
      message.success("Vote added successfully");
      fetchPolls(); // Refresh the polls to reflect the new vote count
    } catch (error) {
      console.error("Failed to add vote:", error);
      message.error("Failed to add vote");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {polls.map((poll) => (
        <div
          key={poll._id}
          className="bg-white shadow-md rounded-lg p-5 m-3 w-full max-w-xl"
        >
          <h3 className="text-lg font-semibold mb-4">{poll.poll_question}</h3>
          <ul>
            {poll.poll_options.map((option) => (
              <li
                key={option._id}
                className="flex justify-between items-center mb-2"
              >
                <span className="text-gray-800">
                  {option.option}: {option.votes}
                </span>
                <button
                  onClick={() => handleVote(poll._id, option._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Vote
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PollsDisplay;
