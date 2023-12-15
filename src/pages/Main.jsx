import React, { useRef, useState } from "react";
import { useGlobalState } from "../hooks";
import { ADD_AlltodoList, DEL, EDIT, UPDATE_EDIT, CLEAR_FALSE } from "../store/Contants";
import { Affix, Checkbox } from "antd";

const Main = () => {
  const [globalState, dispatch] = useGlobalState();
  const { allData, editData, CLEAR_FALSE } = globalState;
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState(false);
  const inputRef = useRef();
  const [formErro, setFormErro] = useState({});
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
      return true;
    } else {
      return checkstatus[index] !== true;
    }
  });

  // count data
  const allItemCount = allData.length;
  const activeItemCount = allData.filter((item, index) => !checkstatus[index]).length;
  const completedItemCount = allData.filter((item, index) => checkstatus[index]).length;

  // handle clear
  const handleClearCompleted = () => {
    dispatch({
      type: CLEAR_FALSE,
    });
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          const elements = document.querySelectorAll("input");
          let formErro = {};
          let mess;
          mess = ``;

          if (!formData.MainInput) {
            formErro.MainInput = mess;
            setFormErro(formErro);
            event.preventDefault();
            return;
          }

          dispatch({
            type: ADD_AlltodoList,
            payload: {
              allData: formData,
            },
          });

          inputRef.current.value = "";
        }}
      >
        <div className=" justify-center flex">
          <div className="text-center ">
            <div className="p-10">
              <p className=" text-8xl font-bold text-[#AF2F2F26] ">todos</p>
            </div>
            <input
              ref={inputRef}
              id="MainInput"
              name="MainInput"
              value={editData?.index}
              placeholder="what need to be done?"
              onChange={handleFormdata("MainInput")}
              className="border-2 border-white outline-none h-[64px] w-[80vh] x-[16px] pl-3 shadow-lg overflow-hidden "
              type="text"
            />

            <div className="border-white border-[1px] shadow-xl  bg-white  ">
              {filteredData.map((item, index) => (
                <ul className="group" onDoubleClick={() => handleEdit(index)} key={index}>
                  <div className="flex justify-between border-y-[1px] p-2    items-center  ">
                    <div className="flex items-center my-auto cursor-pointer  ">
                      <div className="flex items-center mx-auto my-auto cursor-pointer justify-between w-[550px]  ">
                        {globalState.editingIndex === index ? (
                          <div>
                            <input
                              className=" w-96 h-11 ml-2 pl-5 py-2 outline-none border-2 shadow-md bg-[##f5f5f5] "
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
                            <button className=" group" onClick={() => handleEdit()}>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="break-all text-left">
                            <Checkbox
                              className={`${checkstatus[index] && filter !== "all" ? "line-through" : ""} ${
                                checkstatus[index] && filter === "true"
                              }`}
                              onChange={onChange(index)}
                              checked={checkstatus[index] || false}
                            >
                              <p>{item?.MainInput}</p>
                            </Checkbox>
                          </div>
                        )}
                        <div className="text-right flex items-center ">
                          <div
                            onClick={() => handleDelete(index)}
                            className="cursor-pointer text-[#cc9a9a] font-semibold px-3 py-2 text-left transform  hover:text-[#6b4747] text-lg group-hover:opacity-100 opacity-0 transition-opacity  "
                          >
                            X
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              ))}

              <div className="flex border-t-[1px] text-[14px] text-[#777]  px-[15px] shadow-customShadow py-[10px] ">
                <div className="items-center flex">
                  {filter === "all" && allItemCount > 0 ? `Item left:  ${activeItemCount} ` : null}
                  {filter === "false" && activeItemCount > 0 ? `Item left: ${allItemCount}` : null}
                  {filter === "true" && completedItemCount > 0 ? `Item left: ${completedItemCount}` : null}
                </div>

                <div className="flex items-center mx-auto ">
                  <button
                    className={`mx-[3px] px-[3px] py-[7px]  transform transition-transform hover:scale-110 ${
                      filter === "false" ? "border-[1px] border-gray-500 rounded " : ""
                    }`}
                    onClick={() => setFilter("false")}
                  >
                    All
                  </button>
                  <button
                    className={`mx-[3px] px-[3px] py-[7px]  transform transition-transform hover:scale-110 ${
                      filter === "all" ? "border-[1px] border-gray-500 rounded " : ""
                    }`}
                    onClick={() => setFilter("all")}
                  >
                    Active
                  </button>
                  <button
                    className={`mx-[3px] px-[3px] py-[7px]  transform transition-transform hover:scale-110 ${
                      filter === "true" ? "border-[1px] border-gray-500 rounded " : ""
                    }`}
                    onClick={() => {
                      setFilter("true");
                    }}
                  >
                    Completed
                  </button>
                  {/* <button onClick={handleClearCompleted}>clear</button> */}
                </div>
                {/* <div className="cursor-pointer hover:underline items-center flex" onClick={handleClearCompleted}>
                  Clear completed
                </div> */}
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
