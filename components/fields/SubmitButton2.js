const SubmitButton2 = ({ isLoading = false, label = "", ...rest }) => {
  return (
    <button
      type="submit"
      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm lg:text-base font-medium  hover:bg-happy-yellow-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-buttonbg focus-visible:ring-offset-2 bg-buttonbg text-buttontxt w-full"
      disabled={isLoading}
    >
      <div className="loadingcontainer font-bold flex justify-center items-center w-full">
        {isLoading ? <div>cargando</div> : <p>{label}</p>}
      </div>
    </button>
  );
};

export default SubmitButton2;
