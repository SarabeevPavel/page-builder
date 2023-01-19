import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { RxCrossCircled } from "react-icons/rx"
import { BsFillTrashFill } from "react-icons/bs"
import { CardData, EditIndexesType, RowType } from "../utils/types"
import { useForm } from "react-hook-form"

interface ModalProps {
  open: boolean
  onClose: () => void
  editIndexes: EditIndexesType
  rows: RowType[]
  setRows: (newRows: RowType[]) => void
}

const modalRootElement = document.querySelector("#modal")

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  editIndexes,
  rows,
  setRows,
}) => {
  const [preview, setPreview] = useState<string | null>(null)

  const { register, handleSubmit, reset } = useForm()
  const onEdit = (data: any) => {
    console.log(data)

    const { rowIndex, cardIndex } = editIndexes

    const updatedCardData: CardData = {
      title: data.title,
      description: data.description,
      image: preview || "https://i.ibb.co/HxWBh9t/placeholder.jpg",
    }

    const newRows = rows.map((row, i) => {
      if (i === rowIndex) {
        return {
          data: row.data.map((card, i) => {
            if (i === cardIndex) {
              return { data: updatedCardData }
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
    setPreview(null)
    reset()
    onClose()
  }

  const handleUploader = (e: any) => {
    let uploadedFile = e.target.files[0]
    const objectUrl = URL.createObjectURL(uploadedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }

  useEffect(() => {
    const { rowIndex, cardIndex } = editIndexes
    if (rowIndex === null || cardIndex === null) return
    console.log("rowIndex:", rowIndex, "cardIndex:", cardIndex)
    const selectCardData = rows[rowIndex].data[cardIndex]
    console.log(selectCardData)
  }, [editIndexes, rows])

  const element = useMemo(() => document.createElement("div"), [])

  useEffect(() => {
    if (open) {
      modalRootElement?.appendChild(element)
      return () => {
        modalRootElement?.removeChild(element)
      }
    }
  })

  if (open) {
    return createPortal(
      <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-black/30 flex justify-center items-center">
        <div className="w-1/3 min-h-3/5 max-h-2/3 relative bg-gray-700 px-12 py-5 rounded-xl">
          <h3 className="text-center text-white mb-10">Add data</h3>
          <button
            className="absolute right-3 top-3 text-white opacity-50 hover:opacity-100 ease-in-out duration-200 rounded-full"
            onClick={onClose}
          >
            <RxCrossCircled size={25} />
          </button>
          <div className="flex flex-row-reverse justify-between items-start">
            <form
              onSubmit={handleSubmit(onEdit)}
              className="flex flex-col justify-between items-center w-full"
            >
              <input
                type="text"
                defaultValue=""
                {...register("title", { required: true })}
                className="field-default mb-10 h-12"
                maxLength={20}
              />
              <textarea
                defaultValue=""
                {...register("description")}
                className="field-default mb-10 px-3 resize-none h-20 "
                maxLength={80}
              />

              <div className="mb-10 w-full">
                {!preview && (
                  <div className="relative group flex items-center justify-center h-12">
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        multiple={false}
                        className="relative text-right opacity-0 z-20 cursor-pointer w-full"
                        {...register("image")}
                        onChange={(e) => handleUploader(e)}
                      />
                      <button className="absolute left-0 w-full h-12 z-10 flex justify-center items-center rounded-lg text-white bg-blue-700 group-hover:bg-blue-900 ease-in-out duration-200">
                        Add photo
                      </button>
                    </>
                  </div>
                )}
                {preview && (
                  <div className="relative flex items-center justify-center w-full ">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full relative top-0 left-0 right-0 bottom-0 object-cover h-36 z-10"
                    />
                    <div className="z-20 w-full h-full flex justify-center items-center bg-black/50 absolute opacity-0 hover:opacity-100 ease-in-out duration-200">
                      <button
                        onClick={() => setPreview(null)}
                        className="w-10 h-10 p-2 rounded-full hover:bg-red-600 hover:text-white ease-in-out duration-200"
                      >
                        <BsFillTrashFill size={25} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-500 rounded-xl h-10 w-full text-white hover:bg-blue-900 ease-in-out duration-200"
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>,
      element
    )
  }

  return null
}
