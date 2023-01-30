import { EditIndexesType, RowType } from "./types"

export const handleAddRow = (newData: any) => {
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
  return newRow
}

export const handleClearCard = (
  editIndexes: EditIndexesType,
  rows: RowType[]
) => {
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

  return newRows
}
