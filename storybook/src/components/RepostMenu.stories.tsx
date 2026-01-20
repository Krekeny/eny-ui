import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";
import { TamaguiProvider } from "tamagui";
import config from "../../tamagui.config";
import RepostMenu from "./RepostMenu";
import { fn } from "storybook/test";

const GREEN = "#22b022";

const meta = {
  component: RepostMenu,
  args: {
    isReposted: true,
    repostCount: 17,
    repostColor: "#222",
    repostFontWeight: "500",
    iconSize: 20,
    buttonWidth: 120,
    onRepostPress: fn(),
    onQuotePress: fn(),
    disabled: false,
  },
  decorators: [
    (Story) => (
      <TamaguiProvider config={config} defaultTheme="light">
        <View style={{ padding: 16 }}>
          <Story />
        </View>
      </TamaguiProvider>
    ),
  ],
} satisfies Meta<typeof RepostMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <RepostMenu
      {...args}
      repostColor={args.isReposted ? GREEN : args.repostColor}
    />
  ),
};
