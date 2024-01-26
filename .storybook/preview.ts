import type { Preview } from '@storybook/vue3'

// import type { StoryIdentifier } from "@storybook/types"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      // The `a` and `b` arguments in this function have a type of `import('@storybook/types').IndexEntry`. Remember that the function is executed in a JavaScript environment, so use JSDoc for IntelliSense to introspect it.
      storySort: (a /*: StoryIdentifier*/, b /*: StoryIdentifier*/) => {
        console.log('a', a, 'b', b)
        if (a.id === b.id) {
          return 0
        } else {
          return a.id.localeCompare(b.id, undefined, { numeric: true })
        }
      }
    }
  }
}

export default preview
