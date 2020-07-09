import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Text, Wallpaper } from "../components"
import { useStores } from "../models"
import { color, spacing } from "../theme"

const ROOT: ViewStyle = {
  flexGrow: 1,
  backgroundColor: color.palette.transparent,
  marginHorizontal: spacing[2],
}
const FULL: ViewStyle = {
  flex: 1,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  lineHeight: 20,
  fontSize: 16,
  flexWrap: "wrap",
}

export const PostDetailScreen: Component = observer(function PostDetailScreen() {
  // Pull in one of our MST stores
  const { postStore } = useStores()
  const { postDetail } = postStore

  return (
    <View style={FULL}>
      <Wallpaper/>
      <ScrollView style={ROOT}>
        <Text style={TEXT}>
          {JSON.stringify(postDetail)}
        </Text>
      </ScrollView>
    </View>
  )
})
