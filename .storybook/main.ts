import type { StorybookConfig } from '@storybook/nextjs-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  "stories": [
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../modules/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "../public"
  ],
  viteFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss());
    
    config.optimizeDeps = {
      ...(config.optimizeDeps || {}),
      include: [
        ...(config.optimizeDeps?.include || []),
        '@radix-ui/react-separator',
        '@radix-ui/react-slot',
        '@storybook/test',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ],
    };
    return config;
  },
};
export default config;