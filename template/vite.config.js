import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import pxtorem from "postcss-pxtorem";

export default defineConfig({
	plugins: [svelte()],
	build: {
		lib: {
			entry: "./src/main.js", // 入口文件
			name: "SLib",
			fileName: (format) => `lib.${format}.js`
		},
		// cssCodeSplit: true,
		rollupOptions: {
			output: {
				globals: {
					svelte: "svelte"
				},
				dir: "./lib",
				assetFileNames: "lib[extname]"
			}
		}
	},
	css: {
		postcss: {
      plugins:[
        autoprefixer(),
        cssnano(),
        pxtorem({
          rootValue: 36, // 2倍图(720px)
          unitPrecision: 5,
          propList: ["*"],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0,
          exclude: function (file) {
            return file.indexOf("node_modules") !== -1;
          }
        })
      ]
    },
    
	}
});
