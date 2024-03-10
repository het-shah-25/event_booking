import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PollDetails = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/polls/${pollId}`
        );
        setPoll(response.data);
      } catch (error) {
        console.error("Failed to fetch poll details:", error);
      }
    };
    fetchPoll();
  }, [pollId]);

  if (!poll) {
    return (
      <div className="text-center mt-5">
        <p>Loading...</p>
      </div>
    );
  }

  const data = {
    labels: poll.poll_options.map((option) => option.option),
    datasets: [
      {
        label: "Votes",
        data: poll.poll_options.map((option) => option.votes),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Poll Results",
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">
        {poll.poll_question}
      </h1>
      <div className="my-5">
        <Bar data={data} options={options} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Options and Votes:</h2>
        <ul className="list-disc list-inside">
          {poll.poll_options.map((option) => (
            <li key={option._id} className="text-lg mb-2">
              {option.option} - {option.votes} votes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PollDetails;
