import { useState } from "react"
import { Row } from "./components/Row"
import { EditIndexesType, RowType } from "./utils/types"
import { useForm } from "react-hook-form"
import { gaps, piecesOfCard, themes } from "./utils/rowConfig"
import { Modal } from "./components/Modal"
import { Select } from "./components/Select"

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

    const newRow = {
      data: defaultData,
      theme,
      gap: Number(gap),
    }
    setRows([...rows, newRow])
  }

  const handleDeleteRow = (rowIndex: number) => {
    const newRows = rows.filter((row, i) => i !== rowIndex)
    setRows(newRows)
  }

  const handleClearCard = (editIndexes: EditIndexesType) => {
    const { rowIndex, cardIndex } = editIndexes

    const newRows = rows.map((row, i) => {
      if (i === rowIndex) {
        return {
          data: row.data.map((card, i) => {
            if (i === cardIndex) {
              return { data: null }
            } else {
              return card
            }
          }),

          theme: row.theme,
          gap: row.gap,
        }
      } else {
        return row
      }
    })

    setRows(newRows)
  }

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
                onClear={(indexes: EditIndexesType) => handleClearCard(indexes)}
                onDelete={(rowIndex: number) => handleDeleteRow(rowIndex)}
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
              <Select
                data={themes}
                name="theme"
                register={register}
                label="Theme"
              />

              <Select
                data={piecesOfCard}
                name="pcs"
                register={register}
                label="Columns (psc)"
              />

              <Select data={gaps} name="gap" register={register} label="Gap" />
            </div>
            {errors.exampleRequired && <span>This field is required</span>}

            <button
              type="submit"
              className="button-default w-full relative  p-0.5 py-3 mb-2 mr-2  overflow-hidden group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400  focus:ring-4 focus:outline-none focus:ring-pink-200 "
            >
              Add row
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
