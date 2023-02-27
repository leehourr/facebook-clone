import React from "react";
import ReactDOM from "react-dom";
import { Backdrop } from "../../Ui/Backdrop";

const Status = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop className="bg-white/70 cursor-pointer z-50" />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-32 h-32 bg-white">
          asfds
        </div>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Status;
