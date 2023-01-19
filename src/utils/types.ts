export interface CardData {
  image?: string
  title: string
  description?: string
  // background?: string
}

export interface CardType {
  data: CardData | null
}

export interface RowType {
  data: CardType[]
  theme: string
  gap: number
}

export interface EditIndexesType {
  rowIndex: number | null
  cardIndex: number | null
}
