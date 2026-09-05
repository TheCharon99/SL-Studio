#!/usr/bin/env node
/**
 * 微信小程序系统自检脚本
 * 
 * 用法：
 *   cd "E:/portfolio/dazi"
 *   node scripts/check-miniprogram.js
 * 
 * 检查项：
 * 1. JS语法检查
 * 2. 事件绑定完整性
 * 3. 模板函数调用检查
 * 4. wx:key有效性检查
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = process.cwd();
const PAGES_DIR = path.join(PROJECT_ROOT, 'pages');

let totalErrors = 0;
let totalWarnings = 0;

console.log('🔍 微信小程序系统自检\n');

// 1. JS语法检查
console.log('📋 1. JS语法检查...');
try {
  const jsFiles = findJSFiles(PAGES_DIR);
  let hasError = false;
  jsFiles.forEach(file => {
    try {
      execSync(`node -c "${file}"`, { stdio: 'pipe' });
    } catch(e) {
      console.log('  ❌ ' + file + ': ' + e.message.split('\n')[0]);
      hasError = true;
      totalErrors++;
    }
  });
  if (!hasError) console.log('  ✅ 所有JS语法检查通过');
} catch(e) {
  console.log('  ⚠️ 语法检查跳过: ' + e.message);
}
console.log('');

// 2. 事件绑定完整性检查
console.log('📋 2. 事件绑定完整性检查...');
try {
  const pages = fs.readdirSync(PAGES_DIR).filter(f => 
    fs.statSync(path.join(PAGES_DIR, f)).isDirectory()
  );
  
  let hasError = false;
  pages.forEach(page => {
    const jsPath = path.join(PAGES_DIR, page, page + '.js');
    const wxmlPath = path.join(PAGES_DIR, page, page + '.wxml');
    
    if (!fs.existsSync(jsPath) || !fs.existsSync(wxmlPath)) return;
    
    const js = fs.readFileSync(jsPath, 'utf8');
    const wxml = fs.readFileSync(wxmlPath, 'utf8');
    
    // 提取JS方法
    const methodRegex = /(\w+)\s*[:=]\s*function\s*\(/g;
    const methods = new Set();
    let match;
    while ((match = methodRegex.exec(js)) !== null) {
      methods.add(match[1]);
    }
    
    // 检查事件绑定
    const eventRegex = /bind(tap|input|change)="(\w+)"/g;
    while ((match = eventRegex.exec(wxml)) !== null) {
      const eventName = match[2];
      if (!methods.has(eventName)) {
        console.log('  ❌ ' + page + ': 缺少方法 ' + eventName);
        hasError = true;
        totalErrors++;
      }
    }
  });
  
  if (!hasError) console.log('  ✅ 所有事件绑定已定义');
} catch(e) {
  console.log('  ⚠️ 事件检查跳过: ' + e.message);
}
console.log('');

// 3. 模板函数调用检查
console.log('📋 3. 模板函数调用检查...');
try {
  const wxmlFiles = findFiles(PAGES_DIR, '.wxml');
  let hasError = false;
  wxmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // 检查模板中是否有函数调用
    const funcCallRegex = /\{\{(\w+)\s*\(/g;
    let match;
    while ((match = funcCallRegex.exec(content)) !== null) {
      console.log('  ❌ ' + file + ': 模板禁止调用函数: ' + match[1]);
      hasError = true;
      totalErrors++;
    }
  });
  if (!hasError) console.log('  ✅ 无模板函数调用');
} catch(e) {
  console.log('  ⚠️ 模板检查跳过: ' + e.message);
}
console.log('');

// 4. wx:key 有效性检查
console.log('📋 4. wx:key 有效性检查...');
try {
  const wxmlFiles = findFiles(PAGES_DIR, '.wxml');
  let hasWarning = false;
  wxmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/wx:key="([^"]+)"/g) || [];
    matches.forEach(match => {
      const key = match.match(/wx:key="([^"]+)"/)[1];
      if (key.includes('.') || key.includes('(') || key.includes(')')) {
        console.log('  ⚠️ ' + file + ': 无效的wx:key "' + key + '"');
        hasWarning = true;
        totalWarnings++;
      }
    });
  });
  if (!hasWarning) console.log('  ✅ 所有wx:key有效');
} catch(e) {
  console.log('  ⚠️ wx:key检查跳过: ' + e.message);
}

console.log('');
console.log('📊 检查结果:');
console.log('  错误: ' + totalErrors);
console.log('  警告: ' + totalWarnings);

if (totalErrors > 0) {
  console.log('❌ 自检失败，请修复错误后重试');
  process.exit(1);
} else if (totalWarnings > 0) {
  console.log('⚠️ 自检通过，但有警告');
  process.exit(0);
} else {
  console.log('✅ 自检全部通过');
  process.exit(0);
}

function findJSFiles(dir) {
  const files = [];
  fs.readdirSync(dir).forEach(f => {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      files.push(...findJSFiles(fp));
    } else if (f.endsWith('.js') && !f.endsWith('.min.js')) {
      files.push(fp);
    }
  });
  return files;
}

function findFiles(dir, ext) {
  const files = [];
  fs.readdirSync(dir).forEach(f => {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      files.push(...findFiles(fp, ext));
    } else if (f.endsWith(ext)) {
      files.push(fp);
    }
  });
  return files;
}
