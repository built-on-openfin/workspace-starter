const fg = require('fast-glob');
const fs = require('fs-extra');
const { execSync } = require('child_process');
const package = require('../package.json');
const replace = require('replace-in-file');
const yargs = require('yargs');

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
  const URLPattern = new RegExp('http://localhost:8080', 'g');

  let publishDir = 'public-' + args.location;

  if (args.legacy) {
    publishDir = 'public';
    args.location = args.l = 'github';
  }

  let baseURL = URLBaseMap.get(args.location);
  let hostFolder = args.path ? args.path : 'workspace/v' + package.version;

  if (package.howToCustomFolder !== undefined && package.howToCustomFolder !== '') {
    hostFolder = package.howToCustomFolder;
  }

  // Make a publish location specific copy to allow multiple package runs
  // for different locations.
  fs.rmSync(publishDir, { recursive: true, force: true });

  workspaces = fg.sync(package.workspaces, { onlyDirectories: true });
  if (package.packageExclude) {
    workspaces = workspaces.filter((item) => !package.packageExclude.includes(item));
  }

  for (let i = 0; i < workspaces.length; i++) {
    let workspace = workspaces[i];
    let howto = workspace.split('/')[1];

    if (args.legacy) {
      execSync('npm run build-client', {
        cwd: workspace,
        stdio: 'inherit'
      });
    }

    let sourceDir = [workspace, 'public'].join('/');
    let targetDir = [publishDir, howto].join('/');

    fs.copySync(sourceDir, targetDir);

    let URL = [baseURL, 'workspace-starter', hostFolder, howto].join('/');
    let options = {
      files: targetDir + '/**/*.json',
      from: URLPattern,
      to: URL
    };
    try {
      let results = replace.sync(options);
      console.log('Replacement results:', results);
      console.log('URLs replaced with: ' + URL);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
  console.log('Packages prepared for publishing in: ' + publishDir + '/');
}

packageHOWTOs(args);
