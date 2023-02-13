
export const Backdrop = ({ isOpen, onClick, children }) => {
  return (
      <div
        className="fixed flex items-center justify-center top-0 left-0 w-full  h-full z-20 bg-white/75"
        onClick={onClick}
      >
        {children}
      </div>
  );
};
