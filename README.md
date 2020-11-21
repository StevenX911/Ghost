# 我的个人博客

#### 简述

本博客基于[Ghost](./Ghost.md)搭建，部署于国内阿里云，并使用七牛云CDN对站点进行全站加速。数据存储使用Mysql，博客后台界面由Ghost官方提供(基于ember实现)，博客前台由笔者撰写(`未开源`)，同时基于Ghost-API向小程序等第三方平台提供API。另外，笔者同时将博客内置邮箱服务改为了腾讯企业邮箱，可通过admin@tripfe.cn向外收发邮件，原始版本中的邮箱组件版本较低，已替换为较新版本，并配置上线可用。

当前Ghost版本: `2.22.2`

#### 博客架构
```shell
+----------------+    +----------------+    +----------------+
|                |    |                |    |                |
|     Admin      |    |    Browser     |    |    Miniapp     |
|                |    |                |    |                |
+------+---------+    +-------+--------+    +--------+-------+
       ^                      ^                      ^
       |                      |                      |
       |                      |                      |
       |              +-------+--------+             |
       |              |                |             |
       +--------------+    Qiniu CDN   +-------------+
                      |                |
                      +-------+--------+
                              ^
                              |
      +-----------------------------------------------+
      |               +----------------+              |
      |               |                |              |
      |               |  Ghost Server  |              |
      |               |                |              |
      |               +-------+--------+              |
      |                       ^                       |
      | Aliyun                |                       |
      |                       |                       |
      |               +-------+--------+              |
      |               |                |              |
      |               |   MySql DB     |              |
      |               |                |              |
      |               +----------------+              |
      +-----------------------------------------------+

```

##### 博客链接

- https:www.tripfe.cn

#### 安装

Ghost官方推荐使用`ghost-cli`进行生产安装，但是内部夹杂一堆私货，这不是笔者想要的，仅仅保留后台即可，下面是安装步骤：
```shell
# 1. 下载源代码，本例基于v2.22.2，注意要包含git子模块
git clone --recurse-submodules https://github.com/StevenX911/Ghost.git && cd Ghost
# 2. 初始化(仅需做一次)
yarn setup
# 3. 开发环境配置
# 将本地开发和生产配置放置在该目录下，但不要上传至github
# ～/Ghost/core/server/config/env/
# 在这里，我们可以配置数据库、邮箱服务、缓存策略等
# 参考示例：
# ～/Ghost/myconfig/env/config.development.json
# 4. 生产环境配置，参考示例：
# ～/Ghost/myconfig/env/config.production.json
# 5. 本地启动
npm run dev
# 6. 生产上使用pm2启动
npm run pm2
# 7. 博客前台主题设置
# 可通过design模块上传默认主题是Casper，注意版本号
# 可用主题：
# (1).～/Ghost/myconfig/themes/Casper
# (2).～/Ghost/myconfig/themes/attlia
# (3.～/Ghost/myconfig/themes/Editorial
# 直接复制或移动～/Ghost/content/themes该目录下即可使用
```
#### 评论模块
对接`gitment`, 该模块已由笔者汉化，代码仓库：[Github](https://github.com/StevenX911/tripfe-comment)

#### 为何选择Ghost
- 后台支持Markdown写博客，同时也支持一般的富文本编辑
- 前台主题支持自定义(这也是Ghost的卖点)，不过是使用handlebars模版引擎😓（非主流）
- 全站采用SSR，很好的支持SEO，同时也嵌入AMP，对Google收录尤其友好
- 服务器缓存方案设计完善

#### 备份计划
- 每周自动备份数据库和图库，以防阿里云崩溃导致数据丢失
