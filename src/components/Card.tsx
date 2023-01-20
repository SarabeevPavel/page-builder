import { CardType } from "../utils/types"
import { BsPlusCircleFill } from "react-icons/bs"
import { GrClearOption } from "react-icons/gr"

interface CardProps extends CardType {
  rowIndex: number
  cardIndex: number
  onOpen: () => void
  onEdit: (objOfIndexes: { rowIndex: number; cardIndex: number }) => void
  onClear: (objOfIndexes: { rowIndex: number; cardIndex: number }) => void
}

export const Card: React.FC<CardProps> = ({
  data,
  rowIndex,
  cardIndex,
  onOpen,
  onEdit,
  onClear,
}) => {
  return (
    <div className=" h-full overflow-hidden bg-white rounded-md shadow-md border-gray-700">
      {!data && (
        <div className="w-full h-full border-0  flex justify-center items-center bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
          <button
            onClick={() => {
              onOpen()
              onEdit({ rowIndex, cardIndex })
            }}
            className="text-blue-500 rounded-full hover:bg-gradient-to-br from-pink-500 to-orange-400"
          >
            <BsPlusCircleFill size={35} />
          </button>
        </div>
      )}

      {data && (
        <div className="flex flex-col justify-start h-full relative group">
          <div className="w-full h-36 overflow-hidden">
            <img
              className="rounded-t-lg object-cover w-full h-full"
              src={data.image}
              alt="test"
            />
          </div>

          <div className="p-1">
            <p className="mb-2 text-normal font-semibold text-gray-900">
              {data.title}
            </p>

            <p className="mb-3 text-sm font-normal text-gray-700">
              {data.description}
            </p>
          </div>
          <button
            onClick={() => onClear({ rowIndex, cardIndex })}
            className="button-default flex flex-col absolute left-1/2 right-1/2 transform -translate-x-1/2 w-28 rounded-b-full px-3 py-2 -translate-y-full text-black/70 bg-zinc-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 ease-in-out duration-300"
          >
            <GrClearOption size={30} />
            Clear card
          </button>
        </div>
      )}
    </div>
  )
}
