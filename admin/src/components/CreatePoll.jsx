import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      message.error("Poll Question is required.");
      return;
    }
    if (options.length < 2 || options.some((option) => option.trim() === "")) {
      message.error(
        "At least two options are required, and all options must be filled."
      );
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/polls/createpoll",
        {
          poll_question: question,
          poll_options: options.map((option) => ({ option })),
        }
      );
      message.success("Poll created successfully");
      navigate("/poll-list");
      console.log("Poll created:", response.data);
      // Reset form or navigate to a success page
    } catch (error) {
      console.error("Failed to create poll:", error.response.data.message);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pollQuestion"
          >
            Poll Question:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pollQuestion"
            type="text"
            placeholder="Enter poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="mb-4 flex items-center">
            <input
              className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`option${index}`}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeOption(index)}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
            >
              <AiOutlineMinus className="text-white" />
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between mb-4">
          <div className="flex justify-start">
            <button
              type="button"
              onClick={addOption}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              <AiOutlinePlus className="mr-2" />
            </button>
          </div>
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Create Poll
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePoll;
