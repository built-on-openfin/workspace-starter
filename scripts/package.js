const { execSync } = require('child_process');
const fg = require('fast-glob');
const fs = require('fs-extra');
const replace = require('replace-in-file');
const yargs = require('yargs');
const packageJson = require('../package.json');

const URLBaseMap = new Map([
  ['github', 'https://built-on-openfin.github.io'],
  ['aws', 'https://samples.openfin.co']
]);

args = yargs(process.argv.slice(2))
  .usage('$0 [args]')
  .env('PKG_HOWTOS')
  .option('l', {
    alias: 'location',
    choices: Array.from(URLBaseMap.keys()),
    default: 'github',
    type: 'string',
    description: 'Publish location for which the package(s) should be adapted.'
  })
  .option('p', {
    alias: 'path',
    default: '',
    type: 'string',
    description: 'Path under which the HOWTOs should be placed in the publish location.'
  })
  .options('legacy', {
    default: false,
    type: 'boolean',
    description: "Package for github in the 'public/' folder."
  })
  .help()
  .alias('help', 'h').argv;

function packageHOWTOs(args) {
  const URLPattern = /http:\/\/localhost:8080/g;
  const CommonURLPattern = /http:\/\/localhost:8080\/common/g;
  let publishDir = `public-${args.location}`;

  if (args.legacy) {
    publishDir = 'public';
    args.location = 'github';
    args.l = args.location;
  }

  const baseURL = URLBaseMap.get(args.location);
  let hostFolder = args.path ? args.path : `workspace/v${packageJson.version}`;

  if (packageJson.howToCustomFolder !== undefined && packageJson.howToCustomFolder !== '') {
    hostFolder = packageJson.howToCustomFolder;
  }

  // Make a publish location specific copy to allow multiple package runs
  // for different locations.
  fs.rmSync(publishDir, { recursive: true, force: true });

  workspaces = fg.sync(packageJson.workspaces, { onlyDirectories: true });
  if (packageJson.packageExclude) {
    workspaces = workspaces.filter((item) => !packageJson.packageExclude.includes(item));
  }

  for (let i = 0; i < workspaces.length; i++) {
    const workspace = workspaces[i];
    const howto = workspace.split('/')[1];

    if (args.legacy) {
      execSync('npm run build-client', {
        cwd: workspace,
        stdio: 'inherit'
      });
    }

    const sourceDir = [workspace, 'public'].join('/');
    const targetDir = [publishDir, howto].join('/');

    fs.copySync(sourceDir, targetDir);

    const URL = [baseURL, 'workspace-starter', hostFolder, howto].join('/');
    const options = {
      files: `${targetDir}/**/*.json`,
      from: URLPattern,
      to: URL
    };

    const commonUrl = [baseURL, 'workspace-starter', hostFolder, 'common'].join('/');
    const commonOptions = {
      files: `${targetDir}/**/*.json`,
      from: CommonURLPattern,
      to: commonUrl
    };
    try {
      const commonResults = replace.sync(commonOptions);
      console.log('Replacement results for common:', commonResults);
      console.log(`Common URLs replaced with: ${commonUrl}`);

      const results = replace.sync(options);
      console.log('Replacement results:', results);
      console.log(`URLs replaced with: ${URL}`);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
  console.log(`Packages prepared for publishing in: ${publishDir}/`);
}

packageHOWTOs(args);
