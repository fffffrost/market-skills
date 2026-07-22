# 腾讯云发布运行手册

## 适用范围

本手册用于将 `main` 上已经验证的 MARKET//SKILLS 静态导出发布到腾讯云轻量应用服务器。发布过程使用 SSH 与 `rsync`，不依赖浏览器控制台，也不在仓库中保存服务器地址或密钥。

网站发布使用 `site-vX.Y.Z` Git 标签；单个 Skill 的版本继续由各自的 `listing.yaml` 与 `SKILL.md` 管理。两套版本独立，不要求同时升级。

## 前置条件

- 本机已安装 Node.js、npm、Git、SSH 和 `rsync`。
- 服务器已安装 Nginx、`rsync`、`curl` 和 `sha256sum`。
- SSH 密钥已授权到服务器，且密码登录保持禁用。
- 当前工作树干净，目标提交已经推送到 GitHub。
- `.env.production` 已配置真实的 GitHub 仓库和站点 URL，但未纳入版本控制。

## 发布

先在本机设置仅对当前命令生效的服务器地址和密钥路径：

```bash
DEPLOY_HOST=<server-address> \
DEPLOY_KEY=<private-key-path> \
npm run deploy:tencent
```

脚本会依次执行：

1. 拒绝发布未提交的工作树。
2. 重新生产构建并运行 SEO 校验。
3. 用 `rsync` 将 `out/` 同步到独立的 release 目录，并排除 `.DS_Store` 与 `._*`。
4. 对比文件数和首页 SHA-256。
5. 校验 Nginx 配置后切换 `/var/www/market-skills-current` 软链接。
6. 重载 Nginx，轮询到首页响应哈希与本次构建一致后，再检查详情页、安装页、robots、404、分享图 MIME 和关键文案。
7. 任一激活或冒烟检查失败时恢复上一个软链接和 Nginx 配置。

发布成功后会输出 release ID、文件数、首页哈希和 Nginx 状态。旧 release 不会自动删除。

## 只读检查

```bash
ssh -i <private-key-path> root@<server-address> \
  'readlink -f /var/www/market-skills-current && nginx -t && systemctl is-active nginx'
```

## 手动回滚

先从 `/var/www/market-skills-releases/` 选择一个已经验证的旧 release，再原子替换链接：

```bash
ssh -i <private-key-path> root@<server-address>
ln -s /var/www/market-skills-releases/<release-id> /var/www/market-skills-current.rollback
mv -Tf /var/www/market-skills-current.rollback /var/www/market-skills-current
nginx -t
systemctl reload nginx
```

回滚后必须重新检查首页、详情页、安装页和 404。不要删除当前或旧 release，直到确认回滚结果稳定。

## 备案通过后的正式开放

1. 确认备案状态已经通过，并保存备案号。
2. 将域名 A 记录指向服务器公网地址。
3. 将轻量应用服务器防火墙的 TCP 80 和 443 调整为正式公网范围。
4. 签发 HTTPS 证书，配置 HTTP 到 HTTPS 跳转与证书自动续期。
5. 使用正式域名执行全量页面、安装、canonical、sitemap 和外部可用性验收。
6. 确认监控、日志轮转与回滚路径后，再创建 `site-v1.0.0` 标签。
