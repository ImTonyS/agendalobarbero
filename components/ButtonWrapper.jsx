const DottedButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border-2 border-dashed border-barber-blue bg-white px-32 py-2 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#0088E0] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
    >
      {children}
    </button>
  );
};

export default DottedButton;
