#!/usr/bin/env node
const libName = "hummer-components-anyJS";

(async () => {
  const { deployDocsToWebOrg } = await import("@shareit/deploy-engine");
  const res = await deployDocsToWebOrg(
    libName,
    "./storybook-static",
    "storybook-static"
  );
  console.log(res);
  console.log(`http://${res.domain}/${libName}/`);
})();
