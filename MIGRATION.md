# 苏学练习室备份、恢复与重新部署

## 软件来源与数据位置

| 内容 | 位置 |
|---|---|
| 题库、知识点、课内及专项练习 | `dist/*.js`，由 `scripts/build-worker.mjs` 装载 |
| 网页界面与配图 | `dist/index.html`、`dist/styles.css`、`dist/*.webp` |
| 聊天助手、答题与同步服务 | `worker/` |
| D1 结构及变更顺序 | `drizzle/0000_chat_study.sql`、`drizzle/0001_homework_reference.sql`、`drizzle/0002_study_favorites.sql` |
| 现有 Sites 项目标识和绑定声明 | `.openai/hosting.json` |
| 原始照片、电子原件、课件、听力、归档清单及经授权导出的学习备份 | `zhuy3457-cell/suxue-private-archive` 的 `main`，凭证另行管理 |

公开源码仓库为 [zhuy3457-cell/-](https://github.com/zhuy3457-cell/-)。常用入口为 [苏学练习室](https://suxue-grade7-practice.myworkspace-8202.chatgpt.site)。运行环境中通过 Sites 登录和连接器提供身份，GitHub 中的项目 ID 和数据库绑定声明不会随克隆转移托管权限或真实记录。

## 干净环境恢复源码

使用 Node.js 24 或更新版本。构建和测试无需安装 npm 依赖。准备一个仓库外的空目录，用它存放产物。

```bash
git clone https://github.com/zhuy3457-cell/-.git suxue
cd suxue
git checkout main
git rev-parse HEAD
build_dir="$(mktemp -d)"
node scripts/build-worker.mjs "$build_dir/worker"
SUXUE_BUILD_DIR="$build_dir/worker" node --test scripts/test-worker.mjs
node scripts/inspect-bank.mjs "$build_dir/worker" "$build_dir/bank.json"
node scripts/test-browser-backup.mjs
node scripts/build-offline.mjs "$build_dir/离线练习室.html"
node scripts/test-browser-backup.mjs "$build_dir/离线练习室.html"
```

要恢复某一历史版本，将 `git checkout main` 换成已核验的提交或标签。题库 JSON 包含题干、选项、答案、解析及课程关系，可在需要时从源码重建。离线 HTML 直接用浏览器打开，可搜索、做题、导入记录。可将私人归档中的第 2、4 套听力路径作为离线脚本的第二、第三个参数单独生成含听力版本。私人版本的 HTML 同样留在私人归档。

```bash
tar -C "$build_dir/worker" -czf "$build_dir/suxue-worker.tar.gz" .openai dist drizzle
```

## Sites 与聊天助手

1. 先确认现有工作空间和项目的所有权。日常恢复使用现有 Sites 项目、访问策略、链接和 D1 绑定。跨账号或工作空间时，先检查能否获得原工作空间访问权限。若需单独重建，须经用户授权，在目标空间独立创建私有实例并取得新项目 ID。原站继续保留。
2. 仅在授权的新实例分支中，把 `.openai/hosting.json` 的 `project_id` 改为平台返回的新项目 ID，保留 `capabilities: ["mcp"]` 和 `d1: "DB"`。完成新实例的账号访问授权后，提交相关变更并重新构建。
3. 申请目标 Sites 的源码写凭证，推送待发布的确切提交，核对目标源码分支的 SHA。由该提交的构建产物保存版本，再发到该目标实例。保存输出的项目 ID、版本、部署 ID、URL 和提交号。托管权限、身份连接及凭证需要在目标空间重新授权。
4. 用合成数据验证新实例的页面、题库搜索、题组、判分和记录合并。核验 `HEAD /api/study-sync` 返回 204，并通过目标空间的聊天连接调用课表、抽题、判题和统计，再导入私人记录。重新授权聊天连接后，在普通 ChatGPT 中选择目标实例的「七年级学习助手」。
5. 新实例只有平台授予转移能力时才可能沿用原网址。一般迁移并行保留原站与目标实例，验证后由用户决定使用哪个地址。

## 学习记录

导出前可勾选「包含简答草稿」，把本浏览器保存的材料简答草稿纳入 JSON。含草稿的文件应保存在私有位置。导入时只恢复本机没有的草稿，与本机不同的草稿保留本机版本。旧版备份仍可导入。

**网页与离线。** 在原浏览器进入「学习记录 → 导出备份」。如需将已同步的云端题库作答一并纳入，先登录并完成网页的同步。备份包括现有题库题目的作答结果及收藏，导入时按作答编号合并，错题本根据作答历史重建。重复导入同一备份应新增 0 条。当前方案不记录每道题的完整原始作答文本。当前练习进度和浏览器本地音频播放位置也不在备份内。使用多个浏览器或设备时，各自导出并归档。更换账号前先在原账号和浏览器完成导出。

**聊天与 D1。** 网页跨设备同步传输正式题库的作答记录和收藏。收藏变更保存在 D1 的 `study_favorite_events`，包含取消收藏的记录。首次同步可补传浏览器中原有的收藏。聊天里录入的外部作业题干、参考答案和解析保存在 D1 的 `study_attempts`，不会进入网页 JSON。跨账号时需要旧、新账号在托管服务使用的内部标识。现有项目读取数据的工具没有整库导出和写入接口。须由有权限的原库管理员通过平台支持的私有导出取得 SQLite 数据，再由目标库管理员在目标环境执行迁入。若只能取得 SQL 备份，可先在隔离环境将其恢复成 SQLite 文件。

以下脚本操作本地 SQLite 文件。先给空目标库按文件名顺序应用 `drizzle/*.sql`，再执行：

```bash
node scripts/migrate-study-data.mjs export /private/old.sqlite "$old_owner_id" /private/study-rows.json
node scripts/migrate-study-data.mjs import /private/new.sqlite "$new_owner_id" /private/study-rows.json
```

脚本只导出指定账号的行，可映射到目标账号。重复导入跳过等同记录，编号冲突而值不同则整次回滚，不覆盖原有数据。生产库导入应通过平台授予的管理通道完成。完成后校验行数、作答编号、日期、错题统计、聊天作业重练和收藏状态。在原浏览器执行过跨设备同步的收藏可在目标网页同步，也可用浏览器 JSON 恢复。旧版 D1 JSON 仍可导入。不要把个人备份、数据库文件、账号标识或凭证提交到公开 GitHub。

## 测试与回滚

- 每次提交前运行 Worker 测试及网页备份恢复测试。
- 校验 GitHub `main`、部署版本和归档清单均能定位到对应的源码提交。
- 如部署回滚只需部署代码，选择原项目的上一已保存版本。保留现有 D1，数据库结构和值的恢复先在隔离环境演练并获得授权。
