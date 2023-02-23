import { Link } from "react-router-dom";

const SearchFacebook = ({ setShowSearchMenu }) => {
  return (
    <div className="-ml-2 flex flex-col  items-center gap-[10px] py-4 w-full bg-white rounded-lg shadow-[0px_1px_20px_5px_rgba(0,0,0,0.1)]">
      <div className="flex px-4 justify-between w-full">
        <span className="text-[17px]  font-bold">Recent searches</span>
        <Link className="text-blue-800">Edit</Link>
      </div>
      <div className="flex items-center pointer-events-auto z-50 justify-between w-[97%] hover:bg-black/5  p-2 rounded-lg">
        <div className="w-9 h-9 rounded-full bg-black/20"></div>
        <div className="mr-auto ml-4">asdf</div>
        <div className="mr-[2px] rounded-full cursor-pointer z-50 hover:bg-black/10 w-6 h-6 flex items-center justify-center">
          X
        </div>
      </div>
    </div>
  );
};

export default SearchFacebook;
