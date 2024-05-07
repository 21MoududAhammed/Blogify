export default function Field({ label, htmlFor, children, error }) {
  return (
    <div className="mb-6">
      {label && htmlFor && (
        <label className="block mb-2" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-600">{error?.message}</p>}
    </div>
  );
}
