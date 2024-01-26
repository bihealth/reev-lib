import type { Meta, StoryObj } from '@storybook/vue3'

import DocsLink from './DocsLink.vue'

const meta = {
  title: 'Generic/DocsLink',
  component: DocsLink,
  tags: ['autodocs'],
  argTypes: {
    baseUrl: { control: 'text' },
    anchor: { control: 'text' }
  },
  args: { anchor: 'anchor' }
} satisfies Meta<typeof DocsLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    anchor: 'anchor'
  }
}

export const CustomBaseUrl: Story = {
  args: {
    baseUrl: 'https://example.com',
    anchor: 'anchor'
  }
}
