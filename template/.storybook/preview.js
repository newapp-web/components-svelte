/** @type { import('@storybook/svelte').Preview } */
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

const customViewports = {
  "iPhone6/7/8": {
    name: "iPhone6/7/8",
    styles: {
      width: "375px",
      height: "667px",
    },
  },
};
const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
    options: {
      // 控制排序
      storySort: {
        method: '',
        order: ['Introduction', 'Docs', 'Components'],
        locales: '',
      },
    },
	},
	viewport: {
    viewports: { ...MINIMAL_VIEWPORTS, ...customViewports },
  },
};

export default preview;
