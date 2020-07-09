import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"
import { Alert } from "react-native"

const api = new Api()
api.setup()

/**
 * A RootStore model.
 */
// prettier-ignore
export const PostStoreModel = types.model("PostStore")
  .props({
    posts: types.optional(types.frozen(), []),
    postDetail: types.optional(types.frozen(), null),
    page: 0,
    is_loading_initial: false,
  })
  .actions(self => ({
    clearAll() {
      self.postDetail = null
      self.posts = []
      self.page = 0
    },
    setPostDetail(post: any) {
      self.postDetail = post
    },
    getPostsRequest: flow(function* () {
      try {
        self.is_loading_initial = self.page === 0

        let response = yield api.getPostForPage(self.page)
        if (response.kind === "ok") {
          self.page = self.page + 1
          self.posts = [...self.posts, ...response.posts]
          self.is_loading_initial = false
        } else {
          self.is_loading_initial = false
          if (self.page === 0) {
            Alert.alert("Error", "Could not fetch\nError:" + response.kind,
              [{ text: "Ok" }])
          }

        }
      } catch (e) {
        self.is_loading_initial = false
        if (self.page === 0) {
          Alert.alert("Error", "Could not fetch\nError:" + e.message,
            [{ text: "Ok" }])
        }
      }
    }),
  }))

/**
 * The RootStore instance.
 */
export interface PostStore extends Instance<typeof PostStoreModel> {
}

/**
 * The data of a RootStore.
 */
export interface PostStoreSnapshot extends SnapshotOut<typeof PostStoreModel> {
}
