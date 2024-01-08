import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroup } from "./";

const meta = {
  argTypes: {},
  component: RadioGroup,
  tags: ["autodocs"],
  title: "Components/RadioGroup",
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioGroupOwn: Story = {
  args: {
    disabled: false,
    options: [
      { label: "default", value: "default" },
      { label: "first", value: "first" },
      { label: "second", value: "second" },
    ],
  },
};
