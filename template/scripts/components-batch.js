import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import components from "../src/components/components.json" assert { type: "json" };
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import pxtorem from "postcss-pxtorem";


const __dirname = fileURLToPath(new URL(".", import.meta.url));

const configMake = (name) => {
	return {
		configFile: false,
		envFile: false,
		plugins: [svelte()],
		build: {
			lib: {
				entry: path.resolve(__dirname, `../src/components/${name}/index.js`), // 入口文件
				name: `S${name}`,
				fileName: (format) => `${name}.${format}.js`
			},
			rollupOptions: {
				output: {
					globals: {
						svelte: "svelte"
					},
					dir: path.resolve(__dirname, `../lib/components/${name}`),
          assetFileNames: `${name}[extname]`
				}
			},
			cssCodeSplit: false,
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
	};
};

const run = async () => {
	for (const key in components) {
		if (Object.hasOwnProperty.call(components, key)) {
			const component = components[key];
			const config = configMake(key);
			const res = await build(config);
		}
	}
};
run();
