import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a posts
   */

  async getPostForPage(page: number): Promise<Types.GetPostsResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get("", { page: page })
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertPost = raw => {
      return {
        ...raw,
        objectID: raw.objectID,
        title: raw.title,
        url: raw.url,
        created_at: raw.created_at,
        author: raw.author,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawPosts = response.data && response.data.hits ? response.data.hits : []
      const resultUsers: Types.Post[] = rawPosts.map(convertPost)
      return { kind: "ok", posts: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
