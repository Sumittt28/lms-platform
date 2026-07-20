const Input = ({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  ...props 
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <input
          className={`
            w-full rounded-lg border border-gray-300
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
            text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? 'border-red-500' : ''}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
