var env = process.env;
var ADBLOCK = is(env.ADBLOCK);
var CI = is(env.CI);
var COLOR = is(env.npm_config_color);
var SILENT = !!~['silent', 'error', 'warn'].indexOf(env.npm_config_loglevel);

function is(it) {
  return !!it && it !== '0' && it !== 'false';
}

function log(it) {
  console.log(COLOR ? it : it.replace(/\u001B\[\d+m/g, ''));
}

if (!ADBLOCK && !CI && !SILENT) {
  log('\u001B[96m🙌  Thank you for using 🍊 image3D (\u001B[94m https://github.com/yelloxing/image3D \u001B[96m) for Drawing Two-Dimensional Pictures!\u001B[0m\n');
  log('\u001B[96mThe project needs your help! Please consider supporting of image3D on github,the document is located in: \u001B[0m');
  log('\u001B[96m>\u001B[94m 📦  https://yelloxing.github.io/image3D \u001B[0m');
  log('\u001B[96m>\u001B[94m 📦  https://github.com/yelloxing/image3D/tree/master/docs \u001B[0m');
  log('\u001B[96m🚨  Also, the author of 🍊 image3D (\u001B[94m https://yelloxing.github.io/notebook/ \u001B[96m) is looking for a good time -)\u001B[0m\n');
}
