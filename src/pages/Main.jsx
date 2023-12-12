import React, { useState } from "react";
import { useGlobalState } from "../hooks";

const Main = () => {
  const [globalState, dispatch] = useGlobalState();
  const { allData } = globalState;

  const [formData, setFormData] = useState({});
  console.log("🚀 ~ file: Main.jsx:9 ~ Main ~ formData:", formData);

  const handleFormdata = (name) => (ev) => {
    const { value } = ev.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={(event) => {
        const elements = document.querySelectorAll("input");
        event.preventDefault();
        dispatch({ allData: formData.MainInput });
      }}
    >
      <div className=" justify-center flex border-2 border-blue-500 ">
        <div className="text-center ">
          <div className="p-10">
            <p className=" text-7xl font-bold">todos</p>
            <p>Have a good day</p>
          </div>
          <input
            id="MainInput"
            name="MainInput"
            onChange={handleFormdata("MainInput")}
            className="border-2 border-gray-500 outline-none rounded-lg h-12 w-[80vh]"
            type="text"
          />
          <ul className="border-2 h-36 border-blue-500">
            {allData.map((item) => (
              <li key={index}>{item?.allData}</li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
};

export default Main;
