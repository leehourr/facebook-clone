import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../../../store";
import { useSelector } from "react-redux";
import { searchActions } from "../../../store/searchSlice";
import {
  addToSearchHistory,
  getSearchHistory,
  removeSearchHistory,
} from "../../../utils/api-call";
// import { searchAcc } from "../../../utils/api-call";

const SearchFacebook = () => {
  const search = useSelector((state) => state.search);
  const [searchList, setSearchList] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const getHistory = async () => {
      const res = await getSearchHistory();
      setSearchList(
        res.reverse().map((i) => {
          return { i, ...i.user };
        })
      );
    };
    // console.log(searchList);
    if (search.acc.length !== 0) {
      setSearchList(search.acc);
    } else {
      getHistory();
      // setSearchList(list);
      // console.log(list);
    }
  }, [search.acc, searchList]);

  const removeSearch = async (id) => {
    // console.log(id);
    try {
      await removeSearchHistory({ searchUser: id });
    } catch (error) {
      // console.log(error);
    }
    setSearchList((prev) => {
      return prev.filter((e) => e._id !== id);
    });
    store.dispatch(searchActions.removeAcc(id));

    // store.dispatch(searchActions.emptySearch());
  };

  const removeAfterSearch = async (id) => {
    // // console.log(id);
    // setSearchList((prev) => {
    //   return prev.filter((e) => e._id !== id);
    // });
    // store.dispatch(searchActions.removeAcc(id));

    store.dispatch(searchActions.emptySearch());
  };
  const addToSearchHistoryHandler = async (id) => {
    try {
      await addToSearchHistory({ searchUser: id });
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="-ml-2 flex flex-col  items-center gap-[10px] py-4 w-full bg-white rounded-lg shadow-[0px_1px_20px_5px_rgba(0,0,0,0.1)]">
      <div className="flex px-4 justify-between w-full">
        <span className="text-[17px]  font-bold">Recent searches</span>
        <Link className="text-blue-800">Edit</Link>
      </div>
      {searchList.map((i) => (
        <div
          // to={`/${i.username}`}
          key={i._id}
          className="flex items-center p-2 pointer-events-auto cursor-pointer z-50 justify-between w-[97%] hover:bg-black/5   rounded-lg"
        >
          <Link
            to={`/${i.username}`}
            onClick={addToSearchHistoryHandler.bind(null, i._id)}
            className="flex items-center justify-center flex-grow"
          >
            <img
              onClick={removeAfterSearch}
              className="w-9 h-9 ml-1 rounded-full bg-black/20"
              src={i.picture}
              alt=""
            />
            <div
              onClick={removeAfterSearch}
              className="mr-auto p-2 w-full ml-4"
            >{`${i.first_name} ${i.last_name}`}</div>
          </Link>
          <div
            onClick={removeSearch.bind(null, i._id)}
            className="mr-[2px] rounded-full cursor-pointer z-50 hover:bg-black/10 w-6 h-6 flex items-center justify-center"
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchFacebook;
