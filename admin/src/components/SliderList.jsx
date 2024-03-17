import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const SliderList = () => {
  const [sliders, setSliders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/sliders/allslider"
      );
      setSliders(data);
    } catch (error) {
      console.error("Error fetching slider items:", error);
      message.error("Failed to fetch sliders.");
    }
  };

  const deleteSlider = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sliders/delete/${id}`);
      message.success("Slider deleted successfully");
      // Refresh the list of sliders
      fetchSliders();
    } catch (error) {
      console.error("Error deleting slider item:", error);
      message.error("Failed to delete slider.");
    }
  };

  return (
    <div>
      <div className="mb-4 text-right">
        <button
          type="button"
          onClick={() => navigate("/create-slider")}
          style={{ backgroundColor: "#ED5858" }}
          className="text-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Create Slider
        </button>
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Link
              </th>
              <th scope="col" className="py-3 px-6">
                Image
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sliders.map((slider, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-4 px-6">{slider.title}</td>
                <td className="py-4 px-6">{slider.description}</td>
                <td className="py-4 px-6">{slider.link}</td>
                <td className="py-4 px-6">
                  <img
                    src={`http://localhost:5000/${slider.imageUrl}`}
                    alt={slider.title}
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => deleteSlider(slider._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
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

export default SliderList;
