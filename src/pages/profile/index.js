import React, { Suspense} from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
// import ClipLoader from "react-spinners/ClipLoader";
// import Feed from "../../components/Home/Feeds/Feed";
import UserProfile from "../../components/Profile/UserProfile";
import { getProfileData } from "../../utils/api-call";

const Profile = () => {
  const userData = useLoaderData();
  // const [pfData, setPfData] = useState({});

  // userData.data.then((res) => {
  //   setPfData(res.profile);
  // });

  return (
    <div className="top-12 w-full ml-[4rem] xxl:ml-[2rem]  mt-14 h-full">
      <Suspense
      // fallback={
      //   <div className="w-full mt-3 flex items-center justify-center">
      //     <ClipLoader />
      //   </div>
      // }
      >
        <Await
          resolve={userData.data}
          errorElement={
            <p className="text-black font-bold text-s sm:text-lg text-center ">
              Some errors occured.
            </p>
          }
        >
          {(userData) => <UserProfile userData={userData} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default Profile;

export const loader = async ({ params }) => {
  const { name } = params;
  // console.log(name);
  return defer({ data: getProfileData(name) });
};
