import { ToastWaring } from "../utils";
import { ADD_AlltodoList, ADD_MENU, ADD_SETTING, DEL } from "./Contants";

const menu = localStorage.getItem("menu");
const setting = localStorage.getItem("setting");
const allListRender = [];
console.log("🚀 ~ file: Reducer.js:7 ~ allListRender:", allListRender);

export const initState = {
  menu: menu ? JSON.parse(menu) : [],
  setting: setting ? JSON.parse(setting) : {},
  allData: [],
};

export const reducer = (state, action) => {
  // console.log(state, action, action.type, action.payload, "state, action");
  switch (action.type) {
    case ADD_MENU:
      return {
        ...state,
        menu: action.payload,
      };
    case ADD_SETTING:
      return {
        ...state,
        setting: action.payload,
      };

    case ADD_AlltodoList:
      return {
        ...state,
        allData: [...state.allData, action.payload.allData],
      };

    case DEL:
      return {
        ...state,
        allData: state.allData.filter((item, index) => index !== action.payload),
      };

    default:
      return state;
  }
};
