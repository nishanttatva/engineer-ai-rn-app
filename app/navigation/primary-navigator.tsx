/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { PostDetailScreen, PostListScreen } from "../screens"
import { color } from "../theme"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  postList: undefined
  postDetail: undefined
}

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}>
      <Stack.Screen name="postList" component={PostListScreen}
                    options={{
                      title: "Posts",
                      headerTitleStyle: {
                        color: color.palette.white,
                      },
                      headerStyle: {
                        backgroundColor: color.palette.primary,
                      },
                    }}/>
      <Stack.Screen name="postDetail" component={PostDetailScreen}
                    options={{
                      title: "Post Detail",
                      headerTitleStyle: {
                        color: color.palette.white,
                      },
                      headerStyle: {
                        backgroundColor: color.palette.primary,
                      },
                    }}/>
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["postList"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
