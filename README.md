# CocosCSVTool

<p align="center">
  <strong>专为 Cocos Creator 3.8.x + TypeScript 打造的高性能、轻量级 CSV 配置表解析管理器 & 可视化缓动组件库</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Cocos%20Creator-3.8.x-orange?style=flat-square&logo=cocos" alt="Cocos Creator">
  <img src="https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

---

## 📖 目录 (Table of Contents)

- [✨ 特性概览 (Features)](#-特性概览-features)
- [📁 目录结构 (Project Structure)](#-目录结构-project-structure)
- [📊 CSV 配置表规范 (CSV Specification)](#-csv-配置表规范-csv-specification)
  - [三行表头结构](#三行表头结构)
  - [支持的数据类型](#支持的数据类型)
- [🚀 快速上手 (Quick Start)](#-快速上手-quick-start)
  - [1. 配置表放置](#1-配置表放置)
  - [2. 初始化与加载](#2-初始化与加载)
  - [3. 常用查询示例](#3-常用查询示例)
- [📚 CsvManager API 详解 (CsvManager API)](#-csvmanager-api-详解-csvmanager-api)
- [🎬 TweenTool 缓动组件使用指南 (TweenTool Guide)](#-tweentool-缓动组件使用指南-tweentool-guide)
  - [功能特性](#功能特性)
  - [属性面板说明](#属性面板说明)
  - [代码控制示例](#代码控制示例)
- [🧪 示例场景 (Demo Scenes)](#-示例场景-demo-scenes)
- [📄 开源协议 (License)](#-开源协议-license)

---

## ✨ 特性概览 (Features)

### 📊 CsvManager (CSV 配置表管理)
- **⚡ 零依赖 & 超轻量**：纯 TypeScript 编写，专为 Cocos Creator 3.x 运行时优化，无需引入任何庞大的第三方库。
- **📋 标准三行表头设计**：注释行（策划友好）+ 类型行（类型推断）+ 属性名行（代码键名）。
- **🧬 强大类型转换与 JSON 嵌套**：
  - 原生类型支持：`number`、`boolean`（支持 `true`/`false`/`1`/`0`/`t`/`f`）、`string`。
  - **自动 JSON 解析**：当 `string` 字段内包含 JSON 数组（如 `[0,0,1]`）或复杂 JSON 对象/数组（如 `[{"money":10}]`）时，自动转为 JS 原生数组/对象，无需手动二次 `JSON.parse`。
- **🛡️ 极致健壮与容错**：
  - 完美处理单元格内换行、逗号以及嵌套双引号转义（`""`）。
  - 自动剔除表头属性名多余的前后空格，防止策划录入空格导致属性找不到。
- **🔍 丰富的检索 API**：
  - 按主键 ID 查询 (`queryByID`)
  - 单字段单条查询 (`queryOne`)
  - 单字段全量匹配 (`queryAll`)
  - 集合包含查询 (`queryIn`)
  - 多字段组合条件复杂查询 (`queryByCondition`)
  - 全表字典/数组导出 (`getTable` / `getTableArr`)

### 🎬 TweenTool (可视化缓动动效组件)
- **🎨 节点组件化挂载**：直接在 Cocos Creator 编辑器属性检查器中可视化调整动效参数。
- **🎯 多种动画类型**：支持 `Position`（位置）、`Rotation`（旋转）、`Scale`（缩放）、`Opacity`（透明度，自动添加 UIOpacity）、`Color`（颜色，支持 Sprite / Label）。
- **🔄 丰富播放模式**：支持 `NORMAL`（常规）、`REVERSE`（反向）、`YOYO`（往返循环）。
- **📈 40+ 种缓动曲线**：内置 `Linear`、`Quad`、`Cubic`、`Elastic`、`Bounce`、`Back` 等全套 Easing 曲线。
- **⏱️ 循环与事件**：支持无限循环、指定次数循环、启动延迟、往返间隔延迟与完成回调 (`onComplete`)。

---

## 📁 目录结构 (Project Structure)

```text
CocosCSVTool/
├── assets/
│   ├── CsvManager.ts          # CSV 核心解析引擎与数据管理器 (单例)
│   ├── TweeTool.ts            # 可视化缓动动效组件 (TweenTool)
│   ├── Test.ts                # CSV 与配置表使用测试示例脚本
│   ├── Test.scene             # 演示测试场景
│   ├── scene.scene            # 主演示场景
│   ├── gx.png                 # 示例资源
│   ├── resources/             # CSV 资源目录 (通过 resources.load 动态加载)
│   │   ├── task.csv           # 任务配置表 (演示 JSON 数组、布尔、复杂对象)
│   │   ├── store.csv          # 商店配置表 (演示多数值列与表格映射)
│   │   ├── signIn.csv         # 签到奖励配置表
│   │   └── servers.json       # JSON 格式配置示例
│   └── template/              # 策划 Excel 原始模板
│       └── task.xls           # 对应 task.csv 的 Excel 表格模板
├── LICENSE                    # MIT 开源许可证
├── package.json               # Cocos Creator 项目配置
└── tsconfig.json              # TypeScript 编译配置
```

---

## 📊 CSV 配置表规范 (CSV Specification)

### 三行表头结构

本项目推荐并默认采用标准的**三行表头结构**：

| 行号 | 含义 | 说明 | 示例 |
|:---|:---|:---|:---|
| **第 1 行** | **字段注释 (Comment)** | 中文名称/业务描述，便于策划阅读与编辑 | `任务ID,任务名称,下一个任务ID,任务坐标,任务奖励` |
| **第 2 行** | **数据类型 (Cast)** | 声明字段类型 (`number`, `string`, `boolean`) | `number,string,number,string,string` |
| **第 3 行** | **字段名称 (Key)** | 对应 TypeScript 代码中生成的属性名 | `id,tip,nextTask,target,taskReward` |
| **第 4 行起**| **数据内容 (Data)** | 具体的配置表数据行 | `0,前往围栏隘口,1,"[0,0,1]","[{"money":10}]"` |

### 支持的数据类型

| 类型声明 | 描述 | CSV 原始填法示例 | 解析后在 TypeScript 中的数据 |
|:---|:---|:---|:---|
| `number` | 数值型 (整数 / 浮点数) | `100` / `3.14` | `100` / `3.14` (`number`) |
| `boolean` | 布尔型 | `true` / `false` / `1` / `0` | `true` / `false` (`boolean`) |
| `string` | 普通字符串 | `北极熊` / `武器升级` | `"北极熊"` / `"武器升级"` (`string`) |
| `string` | **JSON 数组** (自动解析) | `"[0,0,1]"` | `[0, 0, 1]` (`Array<number>`) |
| `string` | **JSON 对象/数组** (自动解析) | `"[{"money":10,"star":30}]"` | `[{ money: 10, star: 30 }]` (`Array<any>`) |

> [!TIP]
> 导出的 CSV 文件请务必保持 **UTF-8** 编码，推荐使用 Excel / WPS 配合导出脚本或直接另存为 `CSV UTF-8 (逗号分隔)(*.csv)`。

---

## 🚀 快速上手 (Quick Start)

### 1. 配置表放置
将导出的 `.csv` 文件放置在 `assets/resources/` 目录下（如 `assets/resources/task.csv`）。

### 2. 初始化与加载

在游戏启动脚本或加载管理器中调用 `CsvManager.Instance.LoadCsv`：

```typescript
import { _decorator, Component } from 'cc';
import { CsvManager } from './CsvManager';
const { ccclass } = _decorator;

@ccclass('GameLauncher')
export class GameLauncher extends Component {
    start() {
        // 加载全部默认配置表 ('task', 'store', 'signIn')
        CsvManager.Instance.LoadCsv(() => {
            console.log("所有 CSV 配置表加载完成！");
            this.initGameData();
        });
    }

    initGameData() {
        // 开始使用配置表
    }
}
```

如需动态加载单张指定的 CSV 配置表：

```typescript
CsvManager.Instance.getData('customTable', (err, content) => {
    if (!err && content) {
        CsvManager.Instance.addTable('customTable', content);
        console.log("customTable 加载并解析成功！");
    }
});
```

---

### 3. 常用查询示例

以下代码摘录自项目自带的 `assets/Test.ts`：

```typescript
import { _decorator, Component } from 'cc';
import { CsvManager } from './CsvManager';
const { ccclass } = _decorator;

@ccclass('Test')
export class Test extends Component {
    start() {
        CsvManager.Instance.LoadCsv(() => {
            // 1. 根据主键 ID 获取指定行数据
            const row = CsvManager.Instance.queryByID('task', '2');
            if (row) {
                console.log(`ID: ${row.id}, 任务提示: ${row.tip}`);
            }

            // 2. 按条件查询所有匹配项 (例如查询 focus 为 true 的任务)
            const rows = CsvManager.Instance.queryAll('task', 'focus', true);
            for (const key in rows) {
                const item = rows[key];
                console.log(`找到任务 ID: ${item.id}, 内容: ${item.tip}`);
            }

            // 3. 转换为数组并访问自动解析的 JSON 字段
            const taskList = Object.values(rows);
            taskList.forEach((item: any) => {
                console.log('任务提示:', item.tip);
                console.log('坐标数组:', item.target);          // 自动解析为 [x, y, z] 数组
                console.log('任务奖励:', item.taskReward[0]);   // 自动解析为奖励对象 { star: 30 }
            });

            // 4. 获取整张表的数组形式 (适合列表渲染或随机抽取)
            const allTasks = CsvManager.Instance.getTableArr('task');
            const randomTask = allTasks[Math.floor(Math.random() * allTasks.length)];
            console.log('随机任务:', randomTask.tip);
        });
    }
}
```

---

## 📚 CsvManager API 详解 (CsvManager API)

`CsvManager` 为全局单例类，通过 `CsvManager.Instance` 访问。

| API 方法 | 参数说明 | 返回值 | 功能描述 |
|:---|:---|:---|:---|
| `LoadCsv(cb?: Function)` | `cb`: 加载完成回调 | `void` | 批量加载默认预设的所有 CSV 表 |
| `getData(fileName, cb)` | `fileName`: resources相对路径<br>`cb`: `(err, text) => void` | `void` | 从 resources 异步读取文本数据 |
| `addTable(tableName, tableContent, force?)` | `tableName`: 表名<br>`tableContent`: CSV文本<br>`force`: 是否强制覆盖 | `void` | 解析 CSV 文本并注册到内存管理器中 |
| `getTable(tableName)` | `tableName`: 表名 | `Record<string, any>` | 获取以主键 ID 为 Key 的全表字典对象 |
| `getTableArr(tableName)` | `tableName`: 表名 | `Array<any>` | 获取包含该表所有行对象的纯数组 |
| `queryByID(tableName, ID)` | `tableName`: 表名<br>`ID`: 主键 ID 字符串 | `any \| null` | 快速按主键获取单条行记录 |
| `queryOne(tableName, key, value)` | `tableName`: 表名<br>`key`: 字段名<br>`value`: 目标值 | `any \| null` | 查询满足 `item[key] === value` 的首条记录 |
| `queryAll(tableName, key, value)` | `tableName`: 表名<br>`key`: 字段名<br>`value`: 目标值 | `Record<string, any>` | 查询满足条件的所有行字典 |
| `queryIn(tableName, key, values)` | `tableName`: 表名<br>`key`: 字段名<br>`values`: 目标值数组 | `Record<string, any>` | 查询 `item[key]` 在 `values` 集合中的所有行 |
| `queryByCondition(tableName, condition)` | `tableName`: 表名<br>`condition`: 筛选条件对象 | `Record<string, any>` | 多条件组合查询（条件值为数组） |

---

## 🎬 TweenTool 缓动组件使用指南 (TweenTool Guide)

`TweenTool` 是一个通用的可视化动画缓动组件，可挂载于任何 2D/3D 节点上，实现零代码配置入场动画、UI呼吸灯、弹窗缩放、金币跳跃等常见动效。

### 功能特性
- **多种目标属性**：位置 (Position)、旋转 (Rotation)、缩放 (Scale)、透明度 (Opacity)、颜色 (Color)。
- **三种播放模式**：
  - `NORMAL`: 从当前属性值缓动到目标值。
  - `REVERSE`: 反向播放（从目标值缓动回初始值）。
  - `YOYO`: 往返模式（从初始值到目标值，再回到初始值）。
- **灵活的相对/绝对变换**：支持 `toOrby`（`true` 为绝对目标值 `to`，`false` 为相对偏移量 `by`）。
- **组件自动装配**：当动效为 `Opacity` 时，若节点缺少 `UIOpacity` 组件，`TweenTool` 将自动添加。

### 属性面板说明

| 分组 (Group) | 属性名 (Property) | 类型 | 说明 |
|:---|:---|:---|:---|
| **Base** | `target` | `Node` | 动画目标节点，为空时默认指向当前挂载节点 |
| | `playOnLoad` | `boolean` | 是否在节点 `onEnable` 时自动开始播放 |
| **Animation** | `actionType` | `Enum` | 动画类型：`POSITION`, `ROTATION`, `SCALE`, `OPACITY`, `COLOR` |
| | `easeType` | `Enum` | 缓动曲线函数（40+ 种 `EaseType`，如 `bounceOut`, `quadIn` 等） |
| | `duration` | `number` | 单次动画时长（秒） |
| | `delay` | `number` | 开始播放前的延迟等待时间（秒） |
| **Properties** | `position` / `scale` / ... | 对应类型 | 目标值（根据选中的 `actionType` 显示对应输入框） |
| | `toOrby` | `boolean` | `true`: 绝对值 (`to`)，`false`: 相对增量 (`by`) |
| **Playback** | `playbackMode` | `Enum` | `NORMAL` / `REVERSE` / `YOYO` |
| | `yoyoCount` | `number` | `YOYO` 模式下的往返次数 |
| | `reverseDelay` | `number` | `YOYO` 模式下每次返程前的停顿时间（秒） |
| **Loop** | `isLoop` | `boolean` | 是否循环播放 |
| | `loopCount` | `number` | 循环次数（`0` 或 `-1` 表示无限循环，`>0` 为指定次数） |
| **Event** | `onComplete` | `EventHandler` | 动画播放完成触发的自定义事件回调 |
| | `customEventData` | `string` | 回调函数接收的自定义字符串参数 |

### 代码控制示例

除了在编辑器中配置外，你也可以在脚本中动态控制 `TweenTool`：

```typescript
import { _decorator, Component } from 'cc';
import { TweenTool } from './TweeTool';
const { ccclass, property } = _decorator;

@ccclass('DialogController')
export class DialogController extends Component {
    @property(TweenTool)
    popupTween: TweenTool = null!;

    showDialog() {
        // 播放弹窗动效
        this.popupTween.play();
    }

    hideDialog() {
        // 重置并恢复初始状态
        this.popupTween.reset();
    }
}
```

---

## 🧪 示例场景 (Demo Scenes)

项目中包含预置测试场景，双击打开即可预览：
- **`assets/Test.scene`**：CSV 配置表解析与各类查询 API 运行示例（控制台输出日志）。
- **`assets/scene.scene`**：完整测试演示场景。

---

## 📄 开源协议 (License)

本项目基于 [MIT License](file:///d:/Desktop/CocosCSVTool/LICENSE) 开源，欢迎自由用于商业或个人游戏中。
