export const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-10 bg-white/75"
      onClick={props.onClick}
    />
  );
};
