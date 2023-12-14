import React, { useRef, useState } from "react";
import { useGlobalState } from "../hooks";
import { ADD_AlltodoList, DEL, EDIT, UPDATE_EDIT } from "../store/Contants";
import { Affix, Checkbox } from "antd";

const Main = () => {
  const [globalState, dispatch] = useGlobalState();
  const { allData, editData } = globalState;
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
      return checkstatus[index] === false;
    } else {
      return true;
    }
  });
  // handle clearDone
  const handleClearCompleted = () => {
    dispatch({
      type: ADD_AlltodoList,
      payload: {
        allData: allData.filter((item) => !item?.MainInput),
      },
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
              <p className=" text-7xl font-[100px] text-[#AF2F2F26] ">todos</p>
            </div>
            <input
              ref={inputRef}
              id="MainInput"
              name="MainInput"
              value={editData?.index}
              placeholder="what need to be done?"
              onChange={handleFormdata("MainInput")}
              className="border-2 border-white outline-none h-[64px] w-[80vh] x-[16px] pl-3 shadow-lg overflow-hidden"
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
                              className="w-96 h-11 ml-2 pl-5 py-2 outline-none border-2  shadow-md bg-[##f5f5f5]"
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
                          </div>
                        ) : (
                          <Checkbox
                            className={checkstatus[index] ? "line-through rounded" : ""}
                            onChange={onChange(index)}
                            checked={checkstatus[index] || false}
                          >
                            <p> {item?.MainInput}</p>
                          </Checkbox>
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
                <div className="items-center flex">{allData.length > 0 ? `Item left: ${allData.length}` : null}</div>

                <div className="flex items-center mx-auto ">
                  <button
                    className="mx-[3px] px-[3px] py-[7px] border-[1px] border-gray-500 rounded  transform transition-transform hover:scale-110"
                    onClick={() => setFilter("all")}
                  >
                    All
                  </button>
                  <button
                    className="mx-[3px] px-[3px] py-[7px] border-[1px] border-gray-500 rounded  transform transition-transform hover:scale-110"
                    onClick={() => setFilter("false")}
                  >
                    Active
                  </button>
                  <button
                    className="mx-[3px] px-[3px] py-[7px]  border-[1px] border-gray-500 rounded  transform transition-transform hover:scale-110"
                    onClick={() => setFilter("true")}
                  >
                    Completed
                  </button>
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
