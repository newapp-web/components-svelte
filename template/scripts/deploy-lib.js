#!/usr/bin/env node
import pkg from '../package.json' assert {type: "json"}
import path from 'path'
const env = 'prod'

const config = {
  env: env,
  region: "ap-southeast-1",
  domain: "cdn.wtshare.com",
  bucket: `web.h5.ap-southeast-1`,
  path: `web.wshareit.com/${env}/hcanyjs`,
  cloudfront_id: "E319FJEK3EG2C2",
  manufacturer: "AWSS3",
};
const configVersion = {
  ...config,
  path: `web.wshareit.com/${env}/hcanyjs/${pkg.version}`,
};
const source = {
  path: path.resolve("./lib"),
  dirname: "lib",
};
(async () => {
  const { uploadToS3AndInvalidation } = await import("@shareit/deploy-engine");
  const a = await uploadToS3AndInvalidation(source, config, ['/hcanyjs/*']);
  console.log(a);

  const b = await uploadToS3AndInvalidation(source, configVersion, ['/hcanyjs/*']);
  console.log(b);
})();
