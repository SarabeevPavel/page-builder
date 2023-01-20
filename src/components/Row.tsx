import { EditIndexesType, RowType } from "../utils/types"
import { Card } from "./Card"

interface RowProps extends RowType {
  rowIndex: number
  onOpen: () => void
  onEdit: (objOfIndexes: EditIndexesType) => void
  onClear: (indexes: EditIndexesType) => void
}

export const Row: React.FC<RowProps> = ({
  data,
  theme,
  gap,
  rowIndex,
  onOpen,
  onEdit,
  onClear,
}) => (
  <div
    className={`w-full h-72 mb-10 rounded-xl p-2 ${theme}`}
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
  </div>
)
