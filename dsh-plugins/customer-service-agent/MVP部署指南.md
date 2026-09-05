# 🚀 MVP 上线部署指南

## 一、当前状态

✅ **已完成：**
- ✅ dsh 插件开发（3个核心工具）
- ✅ Web UI 原型（E:/portfolio/dsh-plugins/customer-service-agent/web-interface/）
- ✅ FAQ 知识库（8条示例）
- ✅ 配置文件（cordis.patch.yml）

---

## 二、快速部署方案

### 方案 A：本地测试（立即开始）

#### 1. 启动 dsh
```bash
# 打开终端
npx @deepseek-ai/dsh web

# 访问 http://127.0.0.1:3080
```

#### 2. 打开 Web 界面
```bash
# 用浏览器打开
start E:/portfolio/dsh-plugins/customer-service-agent/web-interface/index.html
```

#### 3. 测试功能
- 点击快捷问题测试 FAQ 检索
- 测试人工转接逻辑
- 验证对话历史保存

---

### 方案 B：部署到云服务器

#### 1. 准备服务器
推荐：**阿里云/腾讯云轻量应用服务器**
- 配置：2核4G
- 系统：Ubuntu 22.04
- 成本：约 ¥100/月

#### 2. 安装依赖
```bash
# SSH 登录服务器
ssh user@your-server.com

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2（进程管理）
sudo npm install -g pm2
```

#### 3. 部署 dsh
```bash
# 克隆或复制项目
mkdir -p ~/dsh-agent
cd ~/dsh-agent

# 复制插件目录（从本地）
scp -r E:/portfolio/dsh-plugins/customer-service-agent/ user@your-server.com:~/dsh-agent/

# 安装依赖
cd customer-service-agent
npm install

# 创建配置文件
cat > ~/.dsh/profiles/web/cordis.patch.yml << 'EOF'
- path: /root/dsh-agent/customer-service-agent/index.js
  name: customer-service-agent
EOF
```

#### 4. 启动服务
```bash
# 使用 PM2 启动
npx @deepseek-ai/dsh web &
pm2 save

# 或者手动启动
nohup npx @deepseek-ai/dsh web > dsh.log 2>&1 &

# 访问 http://your-server-ip:3080
```

#### 5. 配置域名（可选）
```bash
# 安装 Nginx
sudo apt-get install nginx

# 配置反向代理
sudo nano /etc/nginx/sites-available/dsh-agent
```

```nginx
server {
    listen 80;
    server_name agent.your-domain.com;
    
    location / {
        proxy_pass http://localhost:3080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 启用配置
sudo ln -s /etc/nginx/sites-available/dsh-agent /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## 三、找种子用户

### 目标用户画像

| 用户类型 | 规模 | 痛点 | 付费意愿 |
|----------|------|------|----------|
| **小型电商** | 1-10人 | 客服人手不足 | 高（¥299/月） |
| **传统企业** | 10-50人 | 客服培训成本高 | 中（¥999/月） |
| **SaaS 产品** | 团队使用 | 需要内置客服 | 高（定制） |

### 寻找渠道

#### 1. 技术社区（免费）
- **V2EX**：相关话题推广
- **掘金**：技术博客
- **GitHub**：开源项目展示
- **Hacker News**：国际社区

#### 2. 垂直社群（精准）
- 电商卖家微信群
- 中小企业家社群
- SaaS 产品经理社群

#### 3. 冷启动策略
```markdown
1. **免费试用**：提供 14 天免费试用
2. **案例收集**：找 3-5 家种子用户免费使用
3. **口碑传播**：请求用户推荐（推荐奖励）
4. **内容营销**：写技术博客，展示能力
```

---

## 四、收集反馈

### 用户访谈问题
1. **使用场景**：什么情况下会使用这个客服系统？
2. **核心痛点**：现在客服最大的问题是什么？
3. **功能评价**：哪些功能最有用？哪些需要改进？
4. **付费意愿**：愿意为这个功能付多少钱？
5. **推荐意愿**：会推荐给其他人吗？为什么？

### 数据指标
- 对话完成率
- 人工转接率
- 用户满意度（NPS）
- 日均使用时长
- 用户留存率

---

## 五、MVP 发布清单

### 技术清单
- [ ] 本地测试通过
- [ ] FAQ 知识库扩展（至少 20 条）
- [ ] Web 界面美化
- [ ] 部署到云服务器
- [ ] 配置域名和 SSL

### 运营清单
- [ ] 创建产品官网（Landing Page）
- [ ] 编写用户文档
- [ ] 制作演示视频
- [ ] 准备常见问题 FAQ
- [ ] 设计定价页面

### 法律清单
- [ ] 隐私政策
- [ ] 服务条款
- [ ] 用户协议
- [ ] 数据保护声明

---

## 六、风险应对

### 技术风险
| 风险 | 应对 |
|------|------|
| dsh API 变化 | 关注 GitHub 更新，保持兼容 |
| Agnes API 宕机 | 添加降级到 DeepSeek |
| 并发性能 | 添加缓存，优化算法 |

### 商业风险
| 风险 | 应对 |
|------|------|
| 用户不接受 | 快速迭代，收集反馈 |
| 竞品竞争 | 差异化定位，专注垂直行业 |
| 获客成本高 | 内容营销，口碑传播 |

---

## 七、下一步行动

### 本周任务
1. ✅ 创建插件（已完成）
2. ⏳ 本地测试（今天）
3. ⏳ 添加更多 FAQ（明天）
4. ⏳ 制作演示视频（后天）
5. ⏳ 发布技术博客（周末）

### 下周任务
1. 部署到云服务器
2. 寻找种子用户
3. 收集反馈并迭代
4. 优化产品体验

---

## 🎯 成功标准

### 30 天目标
- [ ] 10 个种子用户
- [ ] 500+ 对话完成
- [ ] 2 个付费用户
- [ ] NPS > 30

### 90 天目标
- [ ] 50 个活跃用户
- [ ] 10 个付费用户
- [ ] 月营收 ¥3000+
- [ ] 完成产品迭代

---

**立即开始：打开浏览器访问 http://127.0.0.1:3080 测试你的客服 Agent！**
