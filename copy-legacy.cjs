const fs = require('fs');
const files = ['words.js', 'audio.js', 'app.js', 'style.css', 'back_lobby.jpg'];
for (const f of files) {
  fs.copyFileSync(f, 'docs/' + f);
  console.log('Copied:', f);
}
