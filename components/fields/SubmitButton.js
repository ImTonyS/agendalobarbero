const SubmitButton = ({
  style = "primary",
  isLoading = "false",
  text = "",
  ...rest
}) => {
  const className = { ...rest.className };
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`mt-8 btn btn-block bg-barber-blue text-white ${className}`}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;
