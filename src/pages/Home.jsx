import { useGlobalState } from "../hooks";
import Main from "./Main";
import Sidebars from "./Sidebars";

export const Home = () => {
  const [globalState, dispatch] = useGlobalState();
  const { todoList } = globalState;

  return (
    <>
      <div className="flex bg-[#F5F5F5] h-[100vh]">
        <div className="w-1/4 ">
          {" "}
          <Sidebars />
        </div>
        <div className="w-full">
          <Main />
        </div>
      </div>
    </>
  );
};
