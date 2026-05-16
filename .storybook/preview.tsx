import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'Zera Neutral 1000',
      values: [
        {
          name: 'Zera Neutral 1000',
          value: '#FFFFFF',
        },
        {
          name: 'Zera Neutral 900',
          value: '#F6F7F9',
        },
        {
          name: 'Zera Neutral 200',
          value: '#16171A',
        },
      ],
    },
  },
};

export default preview;