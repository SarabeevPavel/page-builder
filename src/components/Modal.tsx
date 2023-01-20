import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { RxCrossCircled } from "react-icons/rx"
import { CardData, EditIndexesType, RowType } from "../utils/types"
import { useForm } from "react-hook-form"
import { Uploader } from "./Uploader"

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const handleEdit = (data: any) => {
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
            onClick={() => {
              onClose()
              reset()
            }}
          >
            <RxCrossCircled size={25} />
          </button>
          <div className="flex flex-row-reverse justify-between items-start">
            <form
              onSubmit={handleSubmit(handleEdit)}
              className="flex flex-col justify-between items-center w-full"
            >
              <div className="filed-container">
                <label
                  className={`mb-2 ${
                    errors.title ? "text-red-500" : "text-white/70"
                  }`}
                >
                  Title *
                </label>
                <input
                  type="text"
                  defaultValue=""
                  {...register("title", { required: true })}
                  className={`field-default mb-10 h-12 ${
                    errors.title ? "bg-red-200" : "bg-white"
                  }`}
                  maxLength={20}
                />
                {errors.title && (
                  <span className="text-red-500 absolute bottom-3">
                    Title is required
                  </span>
                )}
              </div>

              <div className="filed-container">
                <label className="mb-2 text-white/70">Description</label>
                <textarea
                  defaultValue=""
                  {...register("description")}
                  className="field-default mb-10 px-3 resize-none h-20 "
                  maxLength={80}
                />
              </div>

              <Uploader
                preview={preview}
                setPreview={(newPreview) => setPreview(newPreview)}
                register={register}
                handleUploader={handleUploader}
              />

              <button
                type="submit"
                className="button-default bg-blue-600 h-10 w-full text-white hover:bg-blue-900 ease-in-out duration-200"
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
