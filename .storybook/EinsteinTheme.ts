import { create } from 'storybook/theming';

export default create({
  base: 'light',
  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Einstein Storybook',
  brandUrl: 'https://www.einstein.br/',
  brandImage: 'https://media.einstein.br/sites/default/files/2025-07/Simbolo-HIAE-_500x500px.png',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#1774DE',
  colorSecondary: '#1C7CF9',

  // UI
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#DFECFB',
  appBorderRadius: 8,
});
