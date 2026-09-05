import type { StorybookConfig } from "@storybook/tanstack-react-vite"

const config: StorybookConfig = {
  framework: "@storybook/tanstack-react-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  viteFinal: async (config) => config,
}
export default config
