#!/usr/bin/env node
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');


// 判断字符串是否以大写字母开头
function startsWithUppercase(str) {
  if (str.length === 0) {
    return false;
  }
  const firstChar = str.charAt(0);
  return firstChar >= 'A' && firstChar <= 'Z';
}

// 获取组件名
const componentName = process.argv[2];
console.log("🚀 ~ file: createComponents.cjs:9 ~ componentName:", componentName)

if (!componentName) {
  console.error('请提供组件名');
  process.exit(1);
}

if (!startsWithUppercase(componentName)) {
  console.error('组件名必须以大写字母开头');
  process.exit(1);
}

// 定义路径
const componentsDir = path.join(process.cwd(), 'src', 'components');
const componentDir = path.join(componentsDir, componentName);
const componentJsonPath = path.join(componentsDir, 'components.json');
const mainJsPath = path.join(process.cwd(), 'src', 'main.js');

// 创建组件目录和文件
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir);
}

// 创建 Docs.mdx 文件
fs.writeFileSync(path.join(componentDir, 'Docs.mdx'), `
import { Meta, Primary, Controls, Story, Source } from '@storybook/blocks';
import * as ComponentsStories from './${componentName}.stories';

<Meta of={ComponentsStories} />

# ${componentName}

${componentName}组件。


<Primary />

## Props

<Controls />

`);

// 创建 index.js 文件
fs.writeFileSync(path.join(componentDir, 'index.js'), `import ${componentName} from './index.svelte';

export default ${componentName}
`);

// 创建 index.svelte 文件
fs.writeFileSync(path.join(componentDir, 'index.svelte'), `<script>
  export let name = '${componentName}';
</script>

<style>
  /* Add your styles here */
</style>

<div>
  <h1>Hello, {name}!</h1>
</div>`);

// 创建 stories.js 文件
fs.writeFileSync(path.join(componentDir, '${componentName}.stories.js'), `import ${componentName} from './index.svelte';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
};

export const Template = {
	args: {
		title: ${componentName},
	}
};`);

// 更新 components.json
const componentsJson = JSON.parse(fs.readFileSync(componentJsonPath, 'utf-8'));
componentsJson[componentName] = `./${componentName}/index.js`;
fs.writeFileSync(componentJsonPath, JSON.stringify(componentsJson, null, 2));

// 更新 main.js
let mainJsContent = fs.readFileSync(mainJsPath, 'utf-8');
const importStatement = `import ${componentName} from './components/${componentName}/index.js';\n`;
const exportStatement = `  ${componentName},\n`;

// 插入 import 语句
if (!mainJsContent.includes(importStatement)) {
  mainJsContent = importStatement + mainJsContent;
}

// 插入 export 语句
const exportIndex = mainJsContent.indexOf('export {') + 'export {'.length;
mainJsContent = mainJsContent.slice(0, exportIndex) + '\n' + exportStatement + mainJsContent.slice(exportIndex);

fs.writeFileSync(mainJsPath, mainJsContent);

console.log(`组件 ${componentName} 创建成功`);
