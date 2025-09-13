const jtt = require('json-schema-to-typescript')
const fs = require('fs')
const path = require('path');

const basePath = path.join(__dirname, '..', 'src/schema')
const files = fs.readdirSync(basePath);

    var opt = {
        additionalProperties: false,
        cwd: basePath,
        declareExternallyReferenced: true
        
    }

files.forEach((file) => {
  if (path.extname(file) === '.json') {
    try {
      const src = path.join(basePath, file);
      const dst = path.join(basePath, path.basename(file, '.json') + '.ts');

      jtt.compileFromFile(src, opt)
        .then(ts => fs.writeFileSync(dst, ts))
        .catch(err => console.log(err.message));
    } catch(err) {
      console.log(err.message);
    }
  }
});
