/** @type { import('@storybook/svelte').Preview } */
import { MINIMAL_VIEWPORTS, INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const customViewports = {
	"iphone6/7/8": {
		name: "iphone6/7/8",
		styles: {
			width: "375px",
			height: "667px"
		}
	}
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
				method: "",
				order: ["Introduction", "Docs", "Components"],
				locales: ""
			}
		},
		viewport: {
			viewports: { ...customViewports, ...INITIAL_VIEWPORTS, ...MINIMAL_VIEWPORTS },
			defaultViewport: "iphone6/7/8"
		},
		// layout: "centered"
	}
};

export default preview;
