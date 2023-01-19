import { useEffect, useState } from "react"
import { Row } from "./components/Row"
import { CardType, EditIndexesType, RowType } from "./utils/types"
import { useForm } from "react-hook-form"
import { gaps, piecesOfCard, themes } from "./utils/rowConfig"
import { Modal } from "./components/Modal"

function App() {
  const [rows, setRows] = useState<RowType[] | []>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [editIndexes, setEditIndexes] = useState<EditIndexesType>({
    rowIndex: null,
    cardIndex: null,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleAddRow = (newData: any) => {
    const { theme, pcs, gap } = newData

    let defaultData = []
    for (let i = 1; i <= Number(pcs); i += 1) {
      defaultData.push({ data: null })
    }

    console.log(defaultData)
    const numGap = Number(gap)

    const newRow = {
      data: defaultData,
      theme,
      gap: numGap,
    }
    setRows([...rows, newRow])
  }

  // h-screen w-screen
  return (
    <div className="h-screen w-screen">
      <div className="h-full overflow-auto bg-gradient-to-b from-blue-900 to-purple-900 px-10 py-20">
        <div className="flex flex-col justify-center items-center">
          {rows.length ? (
            rows.map((row, i) => (
              <Row
                onEdit={(newEditIndexes: EditIndexesType) =>
                  setEditIndexes(newEditIndexes)
                }
                key={i}
                rowIndex={i}
                data={row.data}
                theme={row.theme}
                gap={row.gap}
                onOpen={() => setIsOpen(true)}
              />
            ))
          ) : (
            <p className="text-2xl text-pink-400 mb-10">
              Let's create your custom Rows!
            </p>
          )}
          <form
            onSubmit={handleSubmit(handleAddRow)}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex mb-3">
              <div className="flex flex-col mr-3">
                <label className="mb-1.5 text-white/80 text-center">
                  Theme
                </label>
                <select
                  {...register("theme")}
                  className="w-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {Object.entries(themes).map(([name, value], i) => (
                    <option key={i} value={value}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mr-3">
                <label className="mb-1.5 text-white/80 text-center">
                  Columns (psc)
                </label>
                <select
                  {...register("pcs")}
                  className="w-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {Object.entries(piecesOfCard).map(([name, value], i) => (
                    <option key={i} value={value}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mr-3">
                <label className="mb-1.5 text-white/80 text-center">Gap</label>
                <select
                  {...register("gap")}
                  className="w-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {Object.entries(gaps).map(([name, value], i) => (
                    <option key={i} value={value}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {errors.exampleRequired && <span>This field is required</span>}
            <button
              type="submit"
              className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white/0 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Add row
              </span>
            </button>
          </form>
        </div>
      </div>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        editIndexes={editIndexes}
        rows={rows}
        setRows={(newRows: RowType[]) => setRows(newRows)}
      />
    </div>
  )
}

export default App
