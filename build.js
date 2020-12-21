const NwBuilder = require('nw-builder');
const fs = require('fs');

const package = JSON.parse(fs.readFileSync('./bin/package.json', 'utf8'));

console.log(`========================================\nBuilding package:\n\t-${package.name}\n\t-${package.version}\n========================================\n`);

const nw = new NwBuilder({
    files: './bin/**/**/**/**',
    platforms: ['osx64', 'win32', 'win64'],
    appVersion: `${package.version}`,
    flavor: 'normal',
    appName: package.name,
    buildDir: './out/',
    buildType: 'versioned',
    winIco: './bin/assets/ico/notepad.ico'
});

// Log stuff you want
nw.on('log',  console.log);

nw.build().then(function () {
    console.log('all done!');
}).catch(function (error) {
    console.error(error);
});
