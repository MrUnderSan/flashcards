import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./";

const meta = {
  argTypes: {},
  component: Checkbox,
  tags: ["autodocs"],
  title: "Components/Checkbox",
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxOwn: Story = {
  args: {
    disabled: false,
  },
};

export const CheckboxWithLabel: Story = {
  args: {
    disabled: false,
    label: "Click me",
  },
};

export const DisabledCheckbox: Story = {
  args: {
    disabled: true,
    label: "Click me",
  },
};
