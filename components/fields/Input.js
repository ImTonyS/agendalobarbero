import clsx from "clsx";

export default function Input({
  label,
  name,
  type,
  prelabel,
  placeholder = "",
  errorMessage = "",
  register,
  ...rest
}) {
  const className = { ...rest.className };

  return prelabel ? (
    <div className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <label className="input input-bordered flex items-center gap-2">
        <span className="text-sm">{prelabel}</span>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`grow focus:outline-none border-none ring-transparent focus:ring-transparent ${className}`}
          {...register}
          {...rest}
        />
      </label>
      {errorMessage && (
        <div className="label">
          <span className="label-text-alt text-error">{errorMessage}</span>
        </div>
      )}
    </div>
  ) : (
    <label className={clsx("form-control w-full")} htmlFor={name}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`input input-bordered w-full  ${className}`}
        {...register}
        {...rest}
      />

      {errorMessage && (
        <div className="label">
          <span className="label-text-alt text-error">{errorMessage}</span>
        </div>
      )}
    </label>
  );
}
