interface SelectProps {
  data: Record<string, string | number>
  name: string
  register: any
  label: string
}

export const Select: React.FC<SelectProps> = ({
  data,
  name,
  register,
  label,
}) => {
  return (
    <div className="flex flex-col mr-3">
      <label className="mb-1.5 text-white/80">{label}</label>
      <select
        {...register(name)}
        className="w-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {Object.entries(data).map(([name, value], i) => (
          <option key={i} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}
