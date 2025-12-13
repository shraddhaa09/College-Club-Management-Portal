const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'frontend', 'src');

function walk(dir){
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for(const e of entries){
    const full = path.join(dir, e.name);
    if(e.isDirectory()) files = files.concat(walk(full));
    else files.push(full);
  }
  return files;
}

function readFile(f){
  try { return fs.readFileSync(f,'utf8'); } catch(e){ return ''; }
}

const all = walk(SRC).filter(f=>/\.(js|jsx|css|svg|png|jpg)$/.test(f));
const imports = new Map();
const basemap = new Map();
all.forEach(f=>{ basemap.set(path.relative(SRC,f).replace(/\\\\/g,'/'), f); imports.set(f, new Set()); });

// find imports in each file
const importRegex = /import\s+(?:[\s\S]+?)\s+from\s+['\"](.+?)['\"]/g;
const requireRegex = /require\(['\"](.+?)['\"]\)/g;
const urlRegex = /url\(['\"]?(.+?)['\"]?\)/g;

all.forEach(f=>{
  const txt = readFile(f);
  let m;
  while((m=importRegex.exec(txt))){
    let imp = m[1];
    if(imp.startsWith('.') ){
      const resolved = path.resolve(path.dirname(f), imp);
      // try with extensions
      const candidates = [resolved, resolved + '.js', resolved + '.jsx', resolved + '.css', resolved + '.svg', resolved + '.png', resolved + '.jpg', resolved + '/index.js'];
      for(const c of candidates){
        if(fs.existsSync(c)){
          imports.get(c).add(f);
          break;
        }
      }
    }
  }
  while((m=requireRegex.exec(txt))){
    let imp = m[1];
    if(imp.startsWith('.')){
      const resolved = path.resolve(path.dirname(f), imp);
      const candidates = [resolved, resolved + '.js', resolved + '.jsx'];
      for(const c of candidates){
        if(fs.existsSync(c)){
          imports.get(c).add(f);
          break;
        }
      }
    }
  }

  // CSS url references
  while((m=urlRegex.exec(txt))){
    let imp = m[1];
    if(imp.startsWith('.')){
      const resolved = path.resolve(path.dirname(f), imp);
      const candidates = [resolved, resolved + '.png', resolved + '.jpg', resolved + '.svg'];
      for(const c of candidates){
        if(fs.existsSync(c)){
          imports.get(c).add(f);
          break;
        }
      }
    }
  }
});

// Mark entry points as having an external incoming link
const entry = path.join(SRC,'index.js');
if(fs.existsSync(entry)) imports.get(entry).add('ENTRY');

const unused = [];
for(const [file, incoming] of imports.entries()){
  if(incoming.size === 0){
    unused.push(path.relative(SRC,file).replace(/\\\\/g,'/'));
  }
}

console.log(JSON.stringify({unused, totalScanned: all.length}, null, 2));
