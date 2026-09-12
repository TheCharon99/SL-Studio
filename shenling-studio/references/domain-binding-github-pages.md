# 域名绑定 GitHub Pages

## DNS 配置步骤

### 1. 在 DNS 服务商添加 CNAME 记录

以 DNSHE 为例（bbroot.com 域名）：
1. 登录 https://my.dnshe.com/
2. 找到对应域名，点击管理
3. 添加记录：
   - 类型：`CNAME`
   - 主机记录：`sl-studio`（子域名前缀）
   - 记录值：`TheCharon99.github.io`（注意大小写，GitHub 用户名.github.io）
4. 保存

### 2. 在 GitHub 启用 Pages 并配置自定义域名

1. 打开仓库设置：https://github.com/USER/REPO/settings/pages
2. Source 选择 `main` 分支，文件夹 `/ (root)`
3. 自定义域名填写：`sl-studio.cc.cd`
4. 保存，等待验证通过后勾选 `Enforce HTTPS`

### 3. 验证

- DNS 生效时间：通常 5-30 分钟
- 验证命令：
  ```bash
  nslookup sl-studio.cc.cd
  # 应返回 github.github.io 的 IP
  ```

## ⚠️ DNSHE 免费域名移动端拦截问题

**问题**：DNSHE 免费域名的 DNS 服务器会拦截移动端访问（显示反诈警告），仅电脑浏览器可正常访问。

**根因**：DNSHE DNS 服务器返回的 IP（如 183.192.65.101）会对 User-Agent 做检测，移动端被阻止。

**解决方案**：将域名 DNS 服务器切换到 Cloudflare（免费）

### 切换步骤

1. 注册 Cloudflare 免费账号：https://dash.cloudflare.com/sign-up
2. 添加站点 `bbroot.com`
3. Cloudflare 会分配两个 Nameserver，如：
   - `bob.ns.cloudflare.com`
   - `zara.ns.cloudflare.com`
4. 在 DNSHE 控制台 → DNS 服务器设置中，填入这两个 Nameserver
5. 等待 DNS 传播（通常几分钟）
6. 在 Cloudflare Dashboard 中为 `sl-studio` 添加 CNAME 记录指向 `TheCharon99.github.io`

**验证**：用不同 DNS 解析域名对比：
```bash
# DNSHE DNS（可能拦截）
nslookup sl-studio.cc.cd

# 外部 DNS（正常解析）
nslookup sl-studio.cc.cd 1.1.1.1
# 应返回 TheCharon99.github.io
```

## 常见平台

| 域名后缀 | DNS 平台 |
|----------|----------|
| bbroot.com | DNSHE (my.dnshe.com) |
| .cc.cd | DNSHE |
| .de5.net | DNSHE |
| 阿里云/腾讯云域名 | 对应云控制台 |
| Cloudflare | Cloudflare Dashboard |

## 注意事项

1. **CNAME 文件**：确保仓库根目录有 `CNAME` 文件，内容为目标域名
2. **不要同时设置 A 记录**：同一主机记录不能同时有 CNAME 和 A 记录
3. **GitHub Pages 必须先启用**：否则自定义域名设置会失败
4. **HTTPS 验证延迟**：GitHub 需要时间来验证 DNS 并完成 SSL 证书签发（通常 5-30 分钟）

## 删除仓库的替代方案

如果 API 删除失败（403 Forbidden），手动删除：
1. 打开 https://github.com/USER/REPO/settings
2. 拉到最底部 "Danger Zone"
3. 点击 "Delete this repository"
4. 输入仓库名确认
