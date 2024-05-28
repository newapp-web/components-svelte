import ShareBar from "./index.svelte";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
	title: "Components/ShareBar",
	component: ShareBar,
	// tags: ["autodocs"],
	argTypes: {
		title: { control: "text", type: "string", description: "分享携带的标题" },
		onClick: { control: "Function" }
	},
  parameters: {
    docs: {
      source: {
        code: `
new ShareBar({
  target,
  props: {
    title: 'Svelte2',
    onClick(item){
      alert(item)
    },
    onShow(item){},
    afterClick(item){}
  }
});`,
      },
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Template = {
	args: {
		title: "Svelte2",
		onClick(item) {
			alert(item);
		},
		onShow() {}
	}
};