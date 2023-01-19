import { RowType } from "../utils/types"
import { Card } from "./Card"

interface RowProps extends RowType {
  rowIndex: number
  onOpen: () => void
  onEdit: (objOfIndexes: { rowIndex: number; cardIndex: number }) => void
}

export const Row: React.FC<RowProps> = ({
  data,
  theme,
  gap,
  rowIndex,
  onOpen,
  onEdit,
}) => {
  //   const columns = `grid-cols-${data.length.toString()}`
  //   console.log(columns)
  console.log(data.length)
  return (
    <div
      className={`${theme} grid gap-${gap} grid-cols-${data.length} w-full h-72 mb-10 rounded-xl p-2`}
    >
      {data.map((card, i) => (
        <Card
          onEdit={onEdit}
          key={i}
          cardIndex={i}
          rowIndex={rowIndex}
          data={card.data}
          onOpen={onOpen}
        />
      ))}
    </div>
  )
}
