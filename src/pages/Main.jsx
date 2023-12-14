import React, { useRef, useState } from "react";
import { useGlobalState } from "../hooks";
import { ADD_AlltodoList, DEL, EDIT, UPDATE_EDIT } from "../store/Contants";
import { Affix, Checkbox } from "antd";

const Main = () => {
  const [globalState, dispatch] = useGlobalState();
  const { allData, editData } = globalState;
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
  // edit
  const handleEdit = (index) => {
    dispatch({
      type: EDIT,
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
              <p className=" text-7xl font-bold text-[#F3E0E0] ">todos</p>
            </div>
            <input
              ref={inputRef}
              id="MainInput"
              name="MainInput"
              value={editData?.index}
              placeholder="what need to be done?"
              onChange={handleFormdata("MainInput")}
              className="border-2 border-white outline-none h-[64px] w-[80vh] x-[16px] pl-3 shadow-lg"
              type="text"
            />

            <div className="border-white border-[1px] shadow-xl p mt-2 bg-white  ">
              {filteredData.map((item, index) => (
                <ul key={index}>
                  <div className="flex justify-between border-y-[1px] p-2   items-center ">
                    <Checkbox
                      className={checkstatus[index] ? "line-through" : ""}
                      onChange={onChange(index)}
                      checked={checkstatus[index] || false}
                    >
                      <p> {item?.MainInput}</p>
                    </Checkbox>
                    <div className="flex items-center my-auto cursor-pointer">
                      <div className="flex items-center my-auto cursor-pointer">
                        <div
                          onClick={() => handleDelete(index)}
                          className="cursor-pointer px-3 py-2 transform transition-transform hover:scale-110 text-lg text[#cc9a9a]"
                        >
                          x
                        </div>
                        <div onClick={() => handleEdit(index)}>edit</div>

                        {globalState.editingIndex === index && (
                          <div>
                            <input
                              value={item.MainInput}
                              onChange={(e) => {
                                dispatch({
                                  type: UPDATE_EDIT,
                                  payload: {
                                    index,
                                    MainInput: e.target.value,
                                  },
                                });
                              }}
                            />
                            <button onClick={() => handleEdit()}>Cancel</button>
                            <button
                              onClick={() => {
                                handleEdit();
                              }}
                            >
                              Save
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ul>
              ))}
              <div className="flex border-t-[1px] text-[#777] py-[10px] px-[15px]">
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
                    Active
                  </div>
                  <div
                    className="px-5 mx-5 border-[1px] border-gray-500 rounded cursor-pointer transform transition-transform hover:scale-110"
                    onClick={() => setFilter("true")}
                  >
                    Completed
                  </div>
                </div>
              </div>
            </div>
            <p className="m-[65px] text-[10px] text-[#bfbfbf]">
              Double-click to edit a todo <br /> Created by petehunt <br /> Part of TodoMVC
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Main;
