### 本地调试 yalc

```bash
# 1. packages/tuya-panel-kit 目录下执行
yarn dev # 或 yarn build, 总之就是成lib目录

# 2. build完 tuya-panel-kit后，example 目录下需要执行这个更新yalc
yarn update:yalc

# 3. example目录下执行
yarn start # 启动面板
yarn start:umi # 启动h5

# 4. 发布tuya-panel-kit到npm，发布到docs平台
# 提交github，由github action自动部署 （正式部署的demo只会从npm拉取已发布的tuya-panel-kit）
```

日常只需要执行：

> yalc 的link貌似是文件copy，和shell In symbol link不同的

```bash
# example 目录下需要执行这个更新yalc
yarn update:yalc
```