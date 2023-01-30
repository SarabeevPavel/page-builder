import { EditIndexesType, RowType } from "../utils/types"
import { Row } from "./Row"

interface RowsListProps {
  rows: RowType[] | []
  onEdit: (objOfIndexes: EditIndexesType) => void
  onOpen: () => void
  onClear: (indexes: EditIndexesType) => void
  onDelete: (rowIndex: number) => void
}

export const RowsList: React.FC<RowsListProps> = ({
  rows,
  onEdit,
  onOpen,
  onClear,
  onDelete,
}) => {
  return (
    <>
      {rows.length ? (
        rows.map((row, i) => (
          <Row
            onEdit={onEdit}
            key={i}
            rowIndex={i}
            data={row.data}
            theme={row.theme}
            gap={row.gap}
            onOpen={onOpen}
            onClear={onClear}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p className="text-2xl text-pink-400 mb-10">
          Let's create your custom Rows!
        </p>
      )}
    </>
  )
}
