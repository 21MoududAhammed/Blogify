export default function Field({ label, htmlFor, children, error }) {
  return (
    <div className="mb-6">
      <label className="block mb-2" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      <p className="text-xs text-red-600">{error?.message}</p>
    </div>
  );
}
