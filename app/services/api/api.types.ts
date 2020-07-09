import { GeneralApiProblem } from "./api-problem"

export interface Post {
  objectID:string
  title: string
  url: string,
  created_at:string
  author: string
}

export type GetPostsResult = { kind: "ok"; posts: Post[] } | GeneralApiProblem
