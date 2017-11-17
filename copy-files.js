// @flow

/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import flowCopySource from 'flow-copy-source';
import path from 'path';
import fse from 'fs-extra';

const baseDir = __dirname;
const buildDir = `${baseDir}/build`;
const files = [
  'LICENSE',
];

function resolveBuildPath(file) {
  return `${buildDir}/${path.basename(file)}`;
}

function copyFile(file) {
  const buildPath = resolveBuildPath(file);
  return new Promise((resolve) => {
    fse.copy(
      file,
      buildPath,
      (err) => {
        if (err) throw err;
        resolve();
      },
    );
  }).then(() => console.log(`Copied ${file} to ${buildPath}`));
}

function readPackageJson() {
  return new Promise((resolve) => {
    fse.readFile(`${baseDir}/package.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    });
  }).then(data => JSON.parse(data));
}

function updatePackageJson(json) {
  delete json.devDependencies;
  json.scripts = {
    prepublishOnly: 'yarn install',
  };

  return Promise.resolve(json);
}

function writePackageJson(json) {
  return new Promise((resolve) => {
    const buildPath = path.resolve(__dirname, `${buildDir}/package.json`);
    const data = JSON.stringify(json, null, 2);
    fse.writeFile(buildPath, data, (err) => {
      if (err) throw err;
      console.log(`Created package.json in ${buildPath}`);
      resolve();
    });
  });
}

function createPackageFile() {
  return readPackageJson()
    .then(updatePackageJson)
    .then(writePackageJson);
}

Promise
  .all(files.map(file => copyFile(file)))
  .then(() => createPackageFile());

flowCopySource(['src'], 'build', { verbose: true });
