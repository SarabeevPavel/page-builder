import { EditIndexesType, RowType } from "../utils/types"
import { Card } from "./Card"
import { ImCross } from "react-icons/im"

interface RowProps extends RowType {
  rowIndex: number
  onOpen: () => void
  onEdit: (objOfIndexes: EditIndexesType) => void
  onClear: (indexes: EditIndexesType) => void
  onDelete: (rowIndex: number) => void
}

export const Row: React.FC<RowProps> = ({
  data,
  theme,
  gap,
  rowIndex,
  onOpen,
  onEdit,
  onClear,
  onDelete,
}) => (
  <div
    className={`w-full h-72 mb-10 rounded-xl p-2 ${theme} relative group`}
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${data.length}, 1fr)`,
      gap: `${gap * 10}px`,
    }}
  >
    {data.map((card, i) => (
      <Card
        onEdit={onEdit}
        key={i}
        cardIndex={i}
        rowIndex={rowIndex}
        data={card.data}
        onOpen={onOpen}
        onClear={onClear}
      />
    ))}
    <button
      onClick={() => onDelete(rowIndex)}
      className="absolute -top-4 -right-4 bg-black/30 p-1 text-white/75 rounded-full w-10 h-10 flex justify-center items-center opacity-0 group-hover:opacity-100 ease-in-out duration-200 hover:bg-black/70 hover:text-red-300"
    >
      <ImCross size={20} />
    </button>
  </div>
)
