import options from '@/shared/options'
import fs from 'fs-extra'
import path from 'node:path'
import { cyan, yellow } from '@/utils/log'
import createSpawnCmd from '@/utils/createSpawnCmd'
import clearConsole from '@/utils/clearConsole'
import { VITE_CLI_VERSION } from '@/shared/constant'
async function installationDeps() {
  // 目录
  const cmdIgnore = createSpawnCmd(options.dest, 'ignore')
  const cmdInherit = createSpawnCmd(options.dest, 'inherit')
  const startTime: number = new Date().getTime()
  yellow(`> 项目模板生成于目录： ${options.dest}`)
  // 生成 gitignore
  await fs.move(
    path.resolve(options.dest, '.gitignore.ejs'),
    path.resolve(options.dest, '.gitignore'),
    { overwrite: true }
  )
  // Git 初始化
  await cmdIgnore('git', ['init'])
  await cmdIgnore('git', ['add .'])
  await cmdIgnore('git', ['commit -m "Initialize by VITE_CLI"'])
  console.log(`> 成功初始化 Git 仓库`)

  // 依赖安装
  console.log(`> 正在自动安装依赖，请稍等...`)
  console.log('')
  await cmdInherit(options.package, ['install'])

  clearConsole('cyan', `VITE_CLI v${VITE_CLI_VERSION}`)
  const endTime: number = new Date().getTime()
  const usageTime: number = (endTime - startTime) / 1000
  cyan(`> 项目已经创建成功，用时${usageTime}s，请输入以下命令继续...`)
  console.log('')
  cyan(`✨✨ cd ${options.name}`)
  cyan(
    options.package === 'npm'
      ? `✨✨ ${options.package} run dev`
      : `✨✨ ${options.package} dev`
  )
  cyan('创建项目成功')
}
export default installationDeps