import React, { FunctionComponent as Component, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Text, Wallpaper } from "../components"
import { useNavigation } from "@react-navigation/native"
import { color, spacing } from "../theme"
import { useStores } from "../models"

const FULL: ViewStyle = {
  flex: 1,
}
const LIST: ViewStyle = {
  marginHorizontal: spacing[4],
}
const LOADER: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.palette.translucent_white,
}
const ROW_CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: spacing[1],
}
const ITEM_CONTAINER: ViewStyle = {
  marginVertical: spacing[4],
}
const LABEL: TextStyle = {
  fontSize: 16,
  color: color.palette.white,
  fontWeight: "bold",
  marginEnd: spacing[2],
}
const VALUE: TextStyle = {
  fontSize: 14,
  color: color.palette.white,
}
const FOOTER: ViewStyle = {
  marginBottom: spacing[4],
}
const SEPARATOR: ViewStyle = {
  height: 1,
  backgroundColor: color.palette.lightGrey,
}

export const PostListScreen: Component = observer(function PostListScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const { postStore } = useStores()
  const { posts, page, is_loading_initial } = postStore
  const [isEndLoading, setIsEndLoading] = useState(false)

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    const interval = setInterval(() => {
      //Interval fetch
      console.log("Interval fetch", page)
      postStore.getPostsRequest()
    }, 10000)

    return () => clearInterval(interval)
  })

  useEffect(() => {
    if (page > 0) {
      //Clear data on load
      postStore.clearAll()
    } else {
      //Initial fetch
      console.log("Initial fetch", page)
      postStore.getPostsRequest()
    }
  }, [])

  const refetchPosts = async () => {
    //fetching on end of list reached
    console.log("on end of list reached fetch", page)
    setIsEndLoading(true)
    await postStore.getPostsRequest()
    setIsEndLoading(false)
  }

  const onClickPost = post => {
    console.log(post)
    postStore.setPostDetail(post)
    navigation.navigate("postDetail")
  }

  //UI methods
  const renderPostItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={ITEM_CONTAINER}
        activeOpacity={0.9}
        onPress={() => onClickPost(item)}
      >
        <View style={ROW_CONTAINER}>
          <Text style={LABEL}>{"Title: "}</Text>
          <Text style={VALUE}>{item.title}</Text>
        </View>
        <View style={ROW_CONTAINER}>
          <Text style={LABEL}>{"Author: "}</Text>
          <Text style={VALUE}>{item.author}</Text>
        </View>
        <View style={ROW_CONTAINER}>
          <Text style={LABEL}>{"URL: "}</Text>
          <Text style={VALUE}>{item.url}</Text>
        </View>
        <View style={ROW_CONTAINER}>
          <Text style={LABEL}>{"Created At: "}</Text>
          <Text style={VALUE}>{item.created_at}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderItemSeparator = () => <View style={SEPARATOR} />

  const renderFooter = () =>
    isEndLoading && <ActivityIndicator size={"large"} color={color.palette.white} style={FOOTER} />

  return (
    <View style={FULL}>
      <Wallpaper />
      <FlatList
        style={LIST}
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item, index) => item.objectID + `${index}`}
        ItemSeparatorComponent={renderItemSeparator}
        onEndReached={refetchPosts}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
      />
      {is_loading_initial && (
        <View style={LOADER}>
          <ActivityIndicator size={"large"} color={color.palette.white} />
        </View>
      )}
    </View>
  )
})
