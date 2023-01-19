import { useState } from "react"
import { CardType, CardData } from "../utils/types"
import { BsPlusCircleFill } from "react-icons/bs"
import { Button } from "./Button"

interface CardProps extends CardType {
  rowIndex: number
  cardIndex: number
  onOpen: () => void
  onEdit: (objOfIndexes: { rowIndex: number; cardIndex: number }) => void
}

export const Card: React.FC<CardProps> = ({
  data,
  rowIndex,
  cardIndex,
  onOpen,
  onEdit,
}) => {
  const handleClick = () => {
    onOpen()
    onEdit({ rowIndex, cardIndex })
  }

  return (
    <div className=" h-full overflow-hidden bg-white rounded-md shadow-md border-gray-700">
      {!data && (
        <div className="w-full h-full border-0 bg-gradient-to-b from-gray-900  via-purple-900 to-violet-600 flex justify-center items-center">
          <button
            onClick={handleClick}
            className="text-blue-500 rounded-full hover:bg-gradient-to-br from-pink-500 to-orange-400"
          >
            <BsPlusCircleFill size={35} />
          </button>
        </div>
      )}

      {data && (
        <div className="flex flex-col justify-start h-full relative">
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
            {/* <button
              onClick={() => console.log("clear")}
              className="absolute inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Clear card
            </button> */}
          </div>
        </div>
      )}
    </div>
  )
}
