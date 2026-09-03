(function() {
    'use strict';

    var API_KEY = localStorage.getItem('vibe_api_key') || '';
    var API_URL = 'https://apihub.agnes-ai.com/v1/chat/completions';
    var currentCode = '';
    var currentMode = '';

    // 如果没设置 API Key，提示用户
    if (!API_KEY) {
        API_KEY = prompt('请输入 API Key（第一次使用）:\n' +
            '可以在 agnes-ai 控制台获取：https://apihub.agnes-ai.com');
        if (API_KEY) {
            localStorage.setItem('vibe_api_key', API_KEY);
        }
    }

    // ========== 预设示例（使用字符串拼接，避免模板字面量问题）==========
    var demos = {
        '计数器': {
            code: '<!DOCTYPE html>\n<html>\n<head><meta charset="UTF-8"><title>计数器</title>\n<style>\nbody{display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#0a0a0a;font-family:sans-serif}\n.counter{text-align:center}\n#count{font-size:96px;font-weight:800;color:#7c3aed;margin:20px 0;transition:all 0.2s}\n.btns{display:flex;gap:12px;justify-content:center}\nbutton{border:none;padding:14px 36px;border-radius:12px;font-size:18px;cursor:pointer;font-weight:600;transition:all 0.15s}\nbutton:active{transform:scale(0.95)}\n.add{background:#7c3aed;color:#fff}.add:hover{background:#6d28d9}\n.sub{background:#333;color:#aaa}.sub:hover{background:#444}\n.reset{background:#1a1a1a;color:#666;border:1px solid #333}.reset:hover{border-color:#7c3aed;color:#7c3aed}\n</style></head>\n<body>\n<div class="counter">\n  <div id="count">0</div>\n  <div class="btns">\n    <button class="sub" onclick="change(-1)">−</button>\n    <button class="reset" onclick="reset()">重置</button>\n    <button class="add" onclick="change(1)">+</button>\n  </div>\n</div>\n<script>\nlet n=0;const el=document.getElementById(\'count\');\nfunction change(d){n+=d;el.textContent=n;el.style.transform=\'scale(1.2)\';setTimeout(()=>el.style.transform=\'scale(1)\',150)}\nfunction reset(){n=0;el.textContent=\'0\'}\n<\/script>\n</body></html>',
            tip: '点击 + / − 按钮计数，重置归零'
        },
        '待办清单': {
            code: '<!DOCTYPE html>\n<html><head><meta charset="UTF-8"><title>待办清单</title>\n<style>\nbody{display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#0a0a0a;font-family:sans-serif;padding:20px}\n.app{width:100%;max-width:480px}\nh3{color:#e0e0e0;margin-bottom:16px;font-size:18px}\n.input-row{display:flex;gap:8px;margin-bottom:16px}\ninput{flex:1;background:#1a1a1a;border:1px solid #2a2a2a;color:#e0e0e0;padding:12px 16px;border-radius:10px;outline:none;font-size:14px}\ninput:focus{border-color:#7c3aed}\n.add-btn{background:#7c3aed;color:#fff;border:none;padding:12px 20px;border-radius:10px;cursor:pointer;font-weight:600;font-size:14px}\n.add-btn:hover{background:#6d28d9}\nul{list-style:none;display:flex;flex-direction:column;gap:8px}\nli{background:#141414;border:1px solid #2a2a2a;padding:12px 16px;border-radius:10px;color:#ccc;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:all 0.2s}\nli:hover{border-color:#7c3aed}\nli.done{opacity:0.4;text-decoration:line-through}\nli .del{margin-left:auto;color:#ef4444;font-size:12px;cursor:pointer}\n.empty{color:#555;text-align:center;padding:30px;font-size:14px}\n</style></head>\n<body>\n<div class="app">\n  <h3>📝 我的待办</h3>\n  <div class="input-row">\n    <input id="inp" placeholder="添加新任务..." onkeypress="if(event.key==\'Enter\')add()">\n    <button class="add-btn" onclick="add()">添加</button>\n  </div>\n  <ul id="list"></ul>\n</div>\n<script>\nlet items=[];\nfunction add(){const v=document.getElementById(\'inp\').value.trim();if(!v)return;items.push({text:v,done:false});document.getElementById(\'inp\').value=\'\';render()}\nfunction toggle(i){items[i].done=!items[i].done;render()}\nfunction remove(i){items.splice(i,1);render()}\nfunction render(){const el=document.getElementById(\'list\');\n  if(!items.length){el.innerHTML=\'<div class="empty">暂无任务，添加一个吧</div>\';return}\n  el.innerHTML=items.map((it,i)=>\'<li class="\'+(it.done?\'done\'\':\'\')+\'" onclick="toggle(\'+i+\')"><span>\'+it.text+\'</span><span class="del" onclick="event.stopPropagation();remove(\'+i+\')">✕</span></li>\').join(\'\')}\n<\/script>\n</body></html>',
            tip: '输入任务回车添加，点击条目完成/删除'
        },
        '圆形动画': {
            code: '<!DOCTYPE html>\n<html><head><meta charset="UTF-8"><title>粒子动画</title>\n<style>\nbody{display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#0a0a0a;overflow:hidden}\n.stage{position:relative;width:300px;height:300px}\n.center{position:absolute;top:50%;left:50%;width:12px;height:12px;background:#7c3aed;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 20px #7c3aed}\n.dot{position:absolute;width:16px;height:16px;border-radius:50%;top:50%;left:50%}\n</style></head>\n<body>\n<div class="stage"><div class="center"></div><div id="dots"></div></div>\n<script>\nconst colors=[\'#7c3aed\',\'#10b981\',\'#f59e0b\',\'#ef4444\',\'#3b82f6\',\'#ec4899\'];\nconst container=document.getElementById(\'dots\');\nconst particles=[];\nfor(let i=0;i<12;i++){\n  const d=document.createElement(\'div\');d.className=\'dot\';\n  d.style.background=colors[i%colors.length];\n  d.style.boxShadow=\'0 0 10px \'+colors[i%colors.length];\n  container.appendChild(d);\n  particles.push({el:d,angle:(Math.PI*2/12)*i,radius:60+Math.random()*60,speed:0.01+Math.random()*0.02});\n}\nfunction animate(){particles.forEach(p=>{p.angle+=p.speed;const x=Math.cos(p.angle)*p.radius;const y=Math.sin(p.angle)*p.radius;p.el.style.transform=\'translate(calc(-50% + \'+x+\'px),calc(-50% + \'+y+\'px))\'});requestAnimationFrame(animate)}\nanimate();\n<\/script>\n</body></html>',
            tip: '粒子绕中心旋转，各有不同速度和距离'
        },
        '颜色切换': {
            code: '<!DOCTYPE html>\n<html><head><meta charset="UTF-8"><title>颜色切换</title>\n<style>\nbody{display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#0a0a0a;font-family:sans-serif;transition:background 0.5s}\n.card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:48px;text-align:center;backdrop-filter:blur(10px)}\n.swatch{width:160px;height:160px;border-radius:24px;margin:0 auto 24px;transition:all 0.4s;box-shadow:0 20px 60px rgba(0,0,0,0.4)}\nh2{color:#fff;margin-bottom:8px;font-size:20px}\n.hex{color:rgba(255,255,255,0.5);font-size:14px;font-family:monospace;margin-bottom:24px}\nbutton{background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.2);padding:12px 32px;border-radius:12px;font-size:15px;cursor:pointer;font-weight:600;transition:all 0.2s}\nbutton:hover{background:rgba(255,255,255,0.25);transform:translateY(-2px)}\n</style></head>\n<body>\n<div class="card">\n  <div class="swatch" id="swatch"></div>\n  <h2 id="name">点击切换颜色</h2>\n  <div class="hex" id="hex">#7c3aed</div>\n  <button onclick="next()">切换 →</button>\n</div>\n<script>\nconst colors=[\n  {name:\'紫电\',hex:\'#7c3aed\'},\n  {name:\'翡翠\',hex:\'#10b981\'},\n  {name:\'琥珀\',hex:\'#f59e0b\'},\n  {name:\'珊瑚\',hex:\'#ef4444\'},\n  {name:\'海洋\',hex:\'#3b82f6\'},\n  {name:\'玫瑰\',hex:\'#ec4899\'},\n  {name:\'极光\',hex:\'#14b8a6\'}\n];\nlet idx=0;\nfunction next(){idx=(idx+1)%colors.length;const c=colors[idx];document.getElementById(\'swatch\').style.background=c.hex;document.getElementById(\'swatch\').style.boxShadow=\'0 20px 60px \'+c.hex+\'66\';document.getElementById(\'name\').textContent=c.name;document.getElementById(\'hex\').textContent=c.hex;document.body.style.background=c.hex+\'11\'}\nnext();\n<\/script>\n</body></html>',
            tip: '点击切换 7 种配色，背景和色块同步变化'
        },
        '番茄钟': {
            code: '<!DOCTYPE html>\n<html><head><meta charset="UTF-8"><title>番茄钟</title>\n<style>\nbody{display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#0a0a0a;font-family:sans-serif}\n.card{width:320px;padding:48px 36px;text-align:center;background:linear-gradient(145deg,#1a1a2e,#0a0a0a);border:1px solid #2a2a3e;border-radius:28px;box-shadow:0 20px 60px rgba(0,0,0,0.5)}\n.title{font-size:14px;color:#7c3aed;letter-spacing:3px;text-transform:uppercase;margin-bottom:24px}\n.timer{font-size:88px;font-weight:800;color:#e0e0e0;font-variant-numeric:tabular-nums;margin-bottom:8px;line-height:1}\n.status{font-size:13px;color:#555;margin-bottom:32px;height:20px}\n.btns{display:flex;gap:10px;justify-content:center}\nbutton{border:none;padding:14px 24px;border-radius:12px;font-size:15px;cursor:pointer;font-weight:600;transition:all 0.15s}\nbutton:active{transform:scale(0.95)}\n.start{background:#7c3aed;color:#fff}.start:hover{background:#6d28d9}\n.pause{background:#1a1a1a;color:#888;border:1px solid #2a2a2a}.pause:hover{border-color:#7c3aed;color:#7c3aed}\n.reset{background:#1a1a1a;color:#888;border:1px solid #2a2a2a}.reset:hover{border-color:#ef4444;color:#ef4444}\n</style></head>\n<body>\n<div class="card">\n  <div class="title">🍅 番茄钟</div>\n  <div class="timer" id="timer">25:00</div>\n  <div class="status" id="status">准备开始</div>\n  <div class="btns">\n    <button class="start" id="startBtn" onclick="startTimer()">开始</button>\n    <button class="pause" onclick="pauseTimer()">暂停</button>\n    <button class="reset" onclick="resetTimer()">重置</button>\n  </div>\n</div>\n<script>\nlet remaining=25*60,timerId=null,running=false;\nfunction fmt(s){const m=String(Math.floor(s/60)).padStart(2,\'0\');const sec=String(s%60).padStart(2,\'0\');return m+\':\'+sec}\nfunction update(){document.getElementById(\'timer\').textContent=fmt(remaining);document.title=fmt(remaining)+\' 番茄钟\'}\nfunction startTimer(){if(running)return;if(remaining<=0)remaining=25*60;running=true;document.getElementById(\'status\').textContent=\'计时中...\';document.getElementById(\'startBtn\').style.opacity=\'0.5\';\n  timerId=setInterval(()=>{remaining--;update();if(remaining<=0){clearInterval(timerId);running=false;remaining=0;document.getElementById(\'status\').textContent=\'🎉 时间到！\';document.getElementById(\'startBtn\').style.opacity=\'1\'}},1000)}\nfunction pauseTimer(){if(!running)return;clearInterval(timerId);running=false;document.getElementById(\'status\').textContent=\'已暂停\';document.getElementById(\'startBtn\').style.opacity=\'1\'}\nfunction resetTimer(){clearInterval(timerId);running=false;remaining=25*60;update();document.getElementById(\'status\').textContent=\'准备开始\';document.getElementById(\'startBtn\').style.opacity=\'1\'}\nupdate();\n<\/script>\n</body></html>',
            tip: '25分钟倒计时，支持开始/暂停/重置'
        },
        '天气卡片': {
            code: '<!DOCTYPE html>\n<html><head><meta charset="UTF-8"><title>天气卡片</title>\n<style>\nbody{display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#0a0a0a;font-family:sans-serif}\n.card{width:340px;background:linear-gradient(145deg,#1e3a5f,#0a1628);border-radius:28px;padding:36px;color:#fff;box-shadow:0 20px 60px rgba(0,0,0,0.5);position:relative;overflow:hidden}\n.card::before{content:\'\';position:absolute;top:-40px;right:-40px;width:160px;height:160px;background:radial-gradient(circle,rgba(255,200,50,0.3),transparent 70%);border-radius:50%}\n.location{font-size:13px;color:rgba(255,255,255,0.5);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px}\n.city{font-size:22px;font-weight:600;margin-bottom:24px}\n.icon{font-size:80px;margin-bottom:8px;filter:drop-shadow(0 4px 12px rgba(255,200,50,0.4))}\n.temp{font-size:72px;font-weight:700;line-height:1;margin-bottom:4px}\n.desc{font-size:14px;color:rgba(255,255,255,0.6);margin-bottom:24px}\n.details{display:flex;gap:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1)}\n.detail{text-align:center;flex:1}\n.detail .val{font-size:18px;font-weight:600}\n.detail .lbl{font-size:11px;color:rgba(255,255,255,0.4);margin-top:4px}\n.switch{position:relative;z-index:1;margin-top:20px;text-align:center}\n.switch button{background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.15);padding:8px 20px;border-radius:20px;font-size:12px;cursor:pointer;transition:all 0.2s}\n.switch button:hover{background:rgba(255,255,255,0.2)}\n</style></head>\n<body>\n<div class="card">\n  <div class="location">当前天气</div>\n  <div class="city" id="city">上海市</div>\n  <div class="icon" id="icon">☀️</div>\n  <div class="temp" id="temp">26°</div>\n  <div class="desc" id="desc">晴朗</div>\n  <div class="details">\n    <div class="detail"><div class="val" id="humid">45%</div><div class="lbl">湿度</div></div>\n    <div class="detail"><div class="val" id="wind">12km/h</div><div class="lbl">风速</div></div>\n    <div class="detail"><div class="val" id="uv">6</div><div class="lbl">UV指数</div></div>\n  </div>\n  <div class="switch"><button onclick="refresh()">🔄 刷新天气</button></div>\n</div>\n<script>\nconst weathers=[\n  {icon:\'☀️\',desc:\'晴朗\',temp:26,humid:45,wind:12,uv:6},\n  {icon:\'⛅\',desc:\'多云\',temp:22,humid:60,wind:18,uv:3},\n  {icon:\'🌧️\',desc:\'小雨\',temp:18,humid:82,wind:25,uv:1},\n  {icon:\'⛈️\',desc:\'雷阵雨\',temp:16,humid:90,wind:40,uv:0},\n  {icon:\'🌙\',desc:\'晴朗夜晚\',temp:14,humid:55,wind:8,uv:0},\n  {icon:\'🌸\',desc:\'温暖\',temp:24,humid:50,wind:10,uv:5}\n];\nfunction refresh(){const w=weathers[Math.floor(Math.random()*weathers.length)];\n  document.getElementById(\'icon\').textContent=w.icon;\n  document.getElementById(\'temp\').textContent=w.temp+\'°\';\n  document.getElementById(\'desc\').textContent=w.desc;\n  document.getElementById(\'humid\').textContent=w.humid+\'%\';\n  document.getElementById(\'wind\').textContent=w.wind+\'km/h\';\n  document.getElementById(\'uv\').textContent=w.uv;\n}\n<\/script>\n</body></html>',
            tip: '点击刷新随机切换天气数据'
        }
    };

    function setExample(name) {
        document.getElementById('idea').value = name;
        document.getElementById('idea').focus();
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function syntaxHighlight(code) {
        var escaped = escapeHtml(code);
        escaped = escaped.replace(/\b(const|let|var|function|return|if|else|for|while|new|this|class|import|export|from|default|async|await|try|catch|throw|typeof)\b/g, '<span class="keyword">$1</span>');
        escaped = escaped.replace(/(&#39;|&quot;|")[^&]*?(\1)/g, '<span class="string">$&</span>');
        escaped = escaped.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
        return escaped;
    }

    function extractCode(response) {
        var text = response.trim();
        var m = text.match(/```(?:html|javascript|js)?\s*([\s\S]*?)```/);
        if (m) return m[1].trim();
        if (text.toLowerCase().indexOf('<!doctype') === 0 || text.toLowerCase().indexOf('<html') === 0) return text;
        var lines = text.split('\n');
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].trim().length > 0 && lines[i].indexOf('```') === -1 && lines[i].indexOf('# ') !== 0) {
                return lines.slice(i).join('\n').trim();
            }
        }
        return text;
    }

    function renderPreview(code) {
        var container = document.getElementById('preview-output');
        container.innerHTML = '';
        var iframe = document.createElement('iframe');
        iframe.setAttribute('sandbox', 'allow-scripts allow-modals');
        iframe.style.cssText = 'width:100%;height:100%;border:none;background:#fff;border-radius:8px';
        container.appendChild(iframe);
        try {
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(code);
            doc.close();
        } catch (e) {
            container.innerHTML = '<span class="preview-placeholder" style="color:#ef4444">预览渲染失败</span>';
        }
    }

    function showError(msg) {
        var el = document.getElementById('error-msg');
        el.textContent = msg;
        el.style.display = 'block';
        setTimeout(function() { el.style.display = 'none'; }, 5000);
    }

    function setLoading(on) {
        var btn = document.getElementById('ai-btn');
        var demoBtn = document.getElementById('demo-btn');
        btn.disabled = on;
        demoBtn.disabled = on;
        if (on) {
            btn.textContent = '生成中...';
        } else {
            btn.textContent = '✨ AI 生成';
        }
    }

    function showDemo(name) {
        var demo = demos[name];
        if (!demo) return;
        currentCode = demo.code;
        currentMode = 'demo';
        document.getElementById('code-label').innerHTML = '生成的代码 <span class="tag-demo">DEMO</span>';
        document.getElementById('code-output').innerHTML = '<span class="comment">// 快速演示</span>\n' + syntaxHighlight(currentCode);
        document.getElementById('preview-output').innerHTML = '<span class="preview-placeholder">' + escapeHtml(demo.tip) + '</span>';
        document.getElementById('copy-btn').style.display = 'block';
        renderPreview(currentCode);
    }

    function generateDemo() {
        var input = document.getElementById('idea').value.trim().toLowerCase();
        if (!input) return;

        var found = null;
        for (var key in demos) {
            if (input.indexOf(key) !== -1) { found = key; break; }
        }
        if (!found) {
            showError('没有找到匹配的示例，试试点击示例按钮或使用 AI 生成');
            return;
        }
        showDemo(found);
    }

    function generateWithAI() {
        var input = document.getElementById('idea').value.trim();
        if (!input) return;

        var model = document.getElementById('model-select').value;
        var btn = document.getElementById('ai-btn');
        var codeOut = document.getElementById('code-output');
        var previewOut = document.getElementById('preview-output');
        var errorMsg = document.getElementById('error-msg');

        errorMsg.style.display = 'none';
        setLoading(true);
        currentMode = 'ai';
        document.getElementById('code-label').innerHTML = 'AI 生成的代码 <span class="tag-ai">AI</span>';
        codeOut.innerHTML = '<div class="loading"><div class="bar"></div><span>AI 正在思考并编写代码...</span></div>';
        previewOut.innerHTML = '<span class="preview-placeholder">// 等待 AI 生成...</span>';
        document.getElementById('copy-btn').style.display = 'none';

        var systemPrompt = '你是一个专业前端工程师。用户描述需求后，生成完整可运行的单文件HTML代码（含HTML/CSS/JS）。只输出代码，不要任何解释或markdown标记。代码要美观、功能完整。';

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API_KEY },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: '请帮我实现：' + input }
                ],
                max_tokens: 3000,
                temperature: 0.2
            })
        })
        .then(function(response) {
            if (!response.ok) return response.json().then(function(err) { throw new Error(err.error ? err.error.message : '请求失败 (' + response.status + ')'); });
            return response.json();
        })
        .then(function(data) {
            var raw = data.choices[0].message.content;
            currentCode = extractCode(raw);
            if (!currentCode || currentCode.length < 100) throw new Error('AI 返回内容过短，请重试');
            codeOut.innerHTML = '<span class="comment">// AI 生成的代码</span>\n' + syntaxHighlight(currentCode);
            document.getElementById('copy-btn').style.display = 'block';
            renderPreview(currentCode);
        })
        .then(function() {
            setLoading(false);
        })
        .catch(function(err) {
            showError('AI 生成失败: ' + err.message);
            codeOut.innerHTML = '<span style="color:#ef4444">// 生成失败：' + escapeHtml(err.message) + '</span>';
            setLoading(false);
        });
    }

    function copyCode() {
        if (!currentCode) return;
        var ta = document.createElement('textarea');
        ta.value = currentCode;
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            var b = document.getElementById('copy-btn');
            var o = b.textContent;
            b.textContent = '✓ 已复制';
            setTimeout(function() { b.textContent = o; }, 1500);
        } catch(e) {
            showError('复制失败');
        }
        document.body.removeChild(ta);
    }

    document.getElementById('idea').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generateDemo(); }
    });

})();
