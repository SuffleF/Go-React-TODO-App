import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        "bg-color": {
          value: { _light: "#f4f4f5", _dark: "#18181b" },
        },
        "navbar-color": {
          value: { _light: "#e4e4e7", _dark: "#27272a" },
        },
        "completed-color": {
          value: { _light: "#22c55e", _dark: "#86efac" },
        },
        "progress-color": {
          value: { _light: "#eab308", _dark: "#fde047" },
        },
      },
    },
  },
})

export const theme = createSystem(defaultConfig, customConfig)