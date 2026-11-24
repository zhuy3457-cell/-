# 苏学练习室

- 优化现有学习站和「七年级学习助手」。变更应覆盖普通 ChatGPT 里的工具调用，保留网页练习和已有学习记录。
- 修改题库、判分、错题或学习记录时，按影响范围检查网页和 MCP。构建 Worker 后运行 `SUXUE_BUILD_DIR=<构建目录> node --test scripts/test-worker.mjs`。
- 完成每次优化后，提交通过测试的变更。涉及线上功能时，更新并核验现有 Sites 部署。随后将提交推送到 GitHub 的 `origin/main`（`zhuy3457-cell/-`），比对本地提交和远端分支。使用普通推送，保持远端历史。
