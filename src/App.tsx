import { useState } from "react"
import { EditIndexesType, RowType } from "./utils/types"
import { useForm } from "react-hook-form"
import { Modal } from "./components/Modal"
import { Form } from "./components/Form"
import { RowsList } from "./components/RowsList"
import { handleAddRow, handleClearCard } from "./utils/handlers"

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

  const onAdd = (newData: any) => {
    const newRow = handleAddRow(newData)
    setRows([...rows, newRow])
  }

  const onDelete = (rowIndex: number) => {
    const newRows = rows.filter((row, i) => i !== rowIndex)
    setRows(newRows)
  }

  const onClear = (editIndexes: EditIndexesType) => {
    const newRows = handleClearCard(editIndexes, rows)
    setRows(newRows)
  }

  return (
    <div className="h-screen w-screen">
      <div className="h-full overflow-auto bg-gradient-to-b from-blue-900 to-purple-900 px-10 py-20">
        <div className="flex flex-col justify-center items-center">
          <RowsList
            rows={rows}
            onEdit={(newEditIndexes: EditIndexesType) =>
              setEditIndexes(newEditIndexes)
            }
            onOpen={() => setIsOpen(true)}
            onClear={(indexes: EditIndexesType) => onClear(indexes)}
            onDelete={(rowIndex: number) => onDelete(rowIndex)}
          />
          <Form
            onSubmit={handleSubmit(onAdd)}
            register={register}
            errors={errors}
          />
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
