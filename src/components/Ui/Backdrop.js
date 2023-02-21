export const Backdrop = ({ isOpen, onClick, children, className }) => {
  return (
    <div
      className={`fixed  top-0  w-full  h-full z-20 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
