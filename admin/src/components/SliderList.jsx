import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const SliderList = () => {
  const [sliders, setSliders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchSliders();
  }, []);

  return (
    <div>
      <div className="mb-4 text-right">
        <button
          type="button"
          onClick={() => navigate("/create-slider")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SliderList;
