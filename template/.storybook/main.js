/** @type { import('@storybook/svelte-vite').StorybookConfig } */
const config = {
	stories: ["../docs/*.mdx", "../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"],
	addons: [
		"@storybook/addon-docs",
		"@storybook/addon-links",
		"@storybook/addon-actions",
		"@storybook/addon-essentials",
		"@storybook/addon-viewport",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		"@storybook/addon-svelte-csf",
		"@storybook/manager-api"
	],
	framework: {
		name: "@storybook/svelte-vite",
		options: {}
	},
	viteFinal: (config) => {
		config.base = "/hummer-components-anyJS/"; // 设置基础路径
		return config;
	},
	addonsPanel: {
		position: "right" // 或 'bottom'
	}
};
export default config;
