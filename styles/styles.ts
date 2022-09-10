import { createStyleBuilder, extractTwColor } from "react-native-zephyr";

export const { styles } = createStyleBuilder({
    extendTheme: {
        colors: {
          ...extractTwColor({ twColor: "orange", name: "orange" }),
        },
      },
})

