#!/usr/bin/env node
const libName = "hummer-components-anyJS";

(async () => {
try {
  const { deployDocsToWebOrg } = await import("deploy-engine-s3");
  const res = await deployDocsToWebOrg(
    libName,
    "./storybook-static",
    "storybook-static"
  );
  console.log(res);
  console.log(`http://${res.domain}/${libName}/`);
} catch (error) {
  console.log("🚀 ~ file: deploy.js:15 ~ error:", error)
  
}
})();
