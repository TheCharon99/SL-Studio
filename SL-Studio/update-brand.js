const fs = require('fs');
const path = require('path');

const dir = 'E:/portfolio/SL-Studio';
const replacements = [
    ['SL-Studio', 'SL-Studio'],
    ['申聆空间设计', '申聆空间设计'],
    ['申聆空间设计 SL-Studio', '申聆空间设计 SL-Studio'],
    ['SL-Studio 申聆空间设计', 'SL-Studio 申聆空间设计'],
    ['thecharon@qq.com', 'thecharon@qq.com'],
    ['19963932624', '19963932624'],
    ['hey_gxs9', 'hey_gxs9'],
];

function processDir(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (file.endsWith('.html') || file.endsWith('.txt') || file.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            for (const [oldStr, newStr] of replacements) {
                if (content.includes(oldStr)) {
                    content = content.split(oldStr).join(newStr);
                    changed = true;
                }
            }
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${file}`);
            }
        }
    }
}

processDir(dir);
console.log('Done!');
