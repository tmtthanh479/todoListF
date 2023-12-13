import React, { useRef, useState } from "react";
import { useGlobalState } from "../hooks";
import { ADD_AlltodoList, DEL } from "../store/Contants";
import { Checkbox } from "antd";

const Main = () => {
  const [globalState, dispatch] = useGlobalState();
  const { allData } = globalState;
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({});
  const inputRef = useRef();

  // get data
  const handleFormdata = (name) => (ev) => {
    const { value } = ev.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // check box
  const [checkstatus, setCheckStatus] = useState(true);

  const onChange = (index) => (e) => {
    console.log(checkstatus);
    const updatedCheckStatus = { ...checkstatus, [index]: e.target.checked };
    setCheckStatus(updatedCheckStatus);
  };
  // del
  const handleDelete = (index) => {
    dispatch({
      type: DEL,
      payload: index,
    });
  };
  // Filter
  const filteredData = allData.filter((item, index) => {
    if (filter === "true") {
      return checkstatus[index] === true;
    } else if (filter === "false") {
      return checkstatus[index] === false;
    } else {
      return true;
    }
  });

  return (
    <>
      <form
        onSubmit={(event) => {
          const elements = document.querySelectorAll("input");

          dispatch({
            type: ADD_AlltodoList,
            payload: {
              allData: formData,
            },
          });
          inputRef.current.value = "";
          event.preventDefault();
        }}
      >
        <div className=" justify-center flex">
          <div className="text-center ">
            <div className="p-10">
              <p className=" text-7xl font-bold">todos</p>
              <p>Have a good day</p>
            </div>
            <input
              ref={inputRef}
              id="MainInput"
              name="MainInput"
              onChange={handleFormdata("MainInput")}
              className="border-2 border-white outline-none rounded-lg h-12 w-[80vh] pl-3 shadow-xl"
              type="text"
            />
            {filteredData.length > 0 && (
              <div className=" rounded-lg  border-white border-[1px] shadow-xl p-5 mt-2 ">
                {filteredData.map((item, index) => (
                  <ul key={index}>
                    <div className="flex justify-between py-2 items-center ">
                      <Checkbox
                        className={checkstatus[index] ? "line-through" : ""}
                        onChange={onChange(index)}
                        checked={checkstatus[index] || false}
                      >
                        <p className="text-2xl"> {item?.MainInput}</p>
                      </Checkbox>
                      <div
                        onClick={() => handleDelete(index)}
                        className="cursor-pointer px-3 py-2 transform transition-transform hover:scale-110 text-lg"
                      >
                        x
                      </div>
                    </div>
                  </ul>
                ))}
                <div className="flex border-t-[1px]  py-5">
                  <div className="items-start">{allData.length > 0 ? `Item left: ${allData.length}` : null}</div>
                  <div className="flex items-center mx-auto">
                    <div
                      className="px-5 mx-5 border-[1px] border-gray-500 rounded cursor-pointer transform transition-transform hover:scale-110"
                      onClick={() => setFilter("all")}
                    >
                      All
                    </div>
                    <div
                      className="px-5 mx-5 border-[1px] border-gray-500 rounded cursor-pointer transform transition-transform hover:scale-110"
                      onClick={() => setFilter("false")}
                    >
                      Done
                    </div>
                    <div
                      className="px-5 mx-5 border-[1px] border-gray-500 rounded cursor-pointer transform transition-transform hover:scale-110"
                      onClick={() => setFilter("true")}
                    >
                      False
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Main;
