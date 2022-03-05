export type BinType = {
  _id: string,
  text: string,
  lang: string,
  reactions: Reaction[]
}

export type Reaction = {
  name: "like" | "love" | "dislike" | "trash";
  number: number
  _id: string
  chosen?: boolean
}