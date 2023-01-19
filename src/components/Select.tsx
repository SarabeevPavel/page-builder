// interface SelectProps {
//   data: Record<string, string | number>
//   registerName: string
//   register: any
// }

// export const Select: React.FC<SelectProps> = ({ data, registerName }) => {
//   return (
//     <div className="flex flex-col mr-3">
//       <label className="mb-1.5 text-white/80">Columns (psc)</label>
//       <select
//         {...register(registerName)}
//         className="w-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//       >
//         {Object.entries(data).map(([name, value]) => (
//           <option
//             className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//             value={value}
//           >
//             {name}
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }
export {}
