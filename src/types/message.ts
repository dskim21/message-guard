export type Draft = {
  title: string
  message: string
}

export type Review = {
  misunderstanding: string
  tone: string
  caution: string
  recommendation: string
}

export type Result = {
  drafts: Draft[]
  review: Review
}