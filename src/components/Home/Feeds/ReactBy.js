import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReactBy = ({ reactLists, id }) => {
  const [data, setData] = useState([]);
  //   const { name } = useParams();

  useEffect(() => {
    if (data.length > 0) return;
    reactLists.forEach(
      (i) => {
        for (const j in i) {
          // let innerObj = {};
          // innerObj[j] = i[j];
          // react.push(i[j]);
          // setData(i[j]);
          setData(i[j]);
        }
      }
      //   console.log(react);
    );
    // setData(react);

    // const getReactions = async () => {
    //   let reactionData;
    //   let reacts = [];
    //   const res = await getReactions(id);
    //   if (res.status === "ok") {
    //     //   setReaction(res?.check || "");
    //     reactionData = res.reacts;
    //   }
    //   //   let total = 0;

    //   for (const i in reactionData) {
    //     let innerObj = {};
    //     innerObj[i] = reactionData[i];
    //     //   total += reactionData[i].length;
    //     reacts.push(innerObj);
    //   }
    //   // setTotalReacts(total);
    //   // console.log("reactionData", reacts);
    //   setData((current) => current.concat(reacts));
    // };
    // const reactData = getReactions().catch((err) => {
    //   console.log(err);
    // });
    // console.log(reactData);
  }, [data.length, reactLists]);

  console.log("react", data);
  data.forEach((i, index) => {
    // i.map((j) => console.log(j.react));
  });

  return (
    <div className="w-[25rem] md:w-[35rem]  shadow-md shadow-black/20 rounded-lg fixed z-70 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 h-[50vh] bg-white">
      (this need to be reload if u do || undo the reaction cuz the data pass
      down from the props. The data can be fetched in its own componenet but
      there will be another work so ill just leave it here, peace)
      <h1 className="ml-3 my-3 text-[18px] pb-2 font-semibold w-[93%] border-b-[1px] border-b-black/20">
        All
      </h1>
      {data.map((i) =>
        i.map((j, index) => (
          <Link
            to={`/${j.reactBy.username}`}
            key={index}
            className="flex group items-center justify-start w-[93%] mx-2 my-2 gap-2"
          >
            <div className="relative">
              <img
                src={j.reactBy.picture}
                className="bg-black/20 w-11 h-11 rounded-full"
                alt=""
              />
              <img
                src={`../../../reacts/${j.react.toLowerCase()}.svg`}
                className="absolute bg-black w-5 h-5 rounded-full bottom-0 right-0"
                alt=""
              />
            </div>
            <h1 className="group-hover:underline">{`${j.reactBy.first_name} ${j.reactBy.last_name}`}</h1>
          </Link>
        ))
      )}
    </div>
  );
};

export default ReactBy;
