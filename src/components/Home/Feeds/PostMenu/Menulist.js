import React, { useEffect, useState } from "react";
import MenuItems from "./MenuItems";

const Menulist = ({ postUserId, userId, imagesLength, setShowMenu }) => {
  const [test, setTest] = useState(false);
  useEffect(() => {
    setTest(postUserId === userId ? true : false);
  }, [postUserId, userId]);

  return (
    <ul className="w-full">
      {test && <MenuItems icon="pin_icon" title="Pin Post" />}
      <MenuItems
        icon="save_icon"
        title="Save Post"
        subtitle="Add this to your saved items."
      />
      <div className="w-[96%] my-1 border-b-[1px] border-b-black/20 mx-auto"></div>
      {test && <MenuItems icon="edit_icon" title="Edit Post" />}
      {!test && (
        <MenuItems
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {imagesLength && <MenuItems icon="download_icon" title="Download" />}
      {imagesLength && (
        <MenuItems icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && (
        <MenuItems img="../../../icons/lock.png" title="Edit audience" />
      )}
      {test && (
        <MenuItems
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {test && <MenuItems icon="delete_icon" title="Turn off translations" />}
      {test && <MenuItems icon="date_icon" title="Edit Date" />}
      {test && (
        <MenuItems icon="refresh_icon" title="Refresh share attachment" />
      )}
      <div className="w-[96%] border-b-[1px] my-1 border-b-black/20 mx-auto"></div>
      {test && <MenuItems icon="archive_icon" title="Move to archive" />}
      {test && (
        <MenuItems
          icon="trash_icon"
          title="Move to trash"
          subtitle="items in your trash are deleted after 30 days"
        />
      )}
      {!test && (
        <div className="w-[96%] border-b-[1px] border-b-black/20 mx-auto"></div>
      )}
      {!test && (
        <MenuItems
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
};

export default Menulist;
