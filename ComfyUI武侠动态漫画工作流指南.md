# 武侠动态漫画 ComfyUI 工作流完整指南

## 一、工作流说明

这是一个完整的ComfyUI工作流，用于制作武侠动态漫画：
- **图片生成：** SDXL（1280x720，16:9电影比例）
- **动画化：** AnimateDiff（8fps，16帧）
- **镜头运动：** 可通过ControlNet控制

---

## 二、环境准备

### 1. 安装ComfyUI

```bash
# 使用comfy-cli（推荐）
pipx install comfy-cli
comfy --skip-prompt install --nvidia
comfy launch --background
```

### 2. 安装自定义节点

```bash
# 进入ComfyUI目录
cd ~/comfy/ComfyUI

# 安装必要节点
comfy node install comfyui-animatediff-evolved
comfy node install comfyui-videohelpersuite
comfy node install comfyui-controlnet-aux
comfy node install comfyui-essentials
```

### 3. 下载模型

```bash
# SDXL基础模型
comfy model download \
  --url "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors" \
  --relative-path models/checkpoints

# AnimateDiff运动模块
comfy model download \
  --url "https://huggingface.co/guoyww/animatediff/resolve/main/mm_sd_v15_v2.ckpt" \
  --relative-path models/animatediff_models
```

---

## 三、导入工作流

### 方法1：直接加载JSON

1. 打开ComfyUI Web UI：http://localhost:8188
2. 点击菜单 `Workflow` → `Load (API Format)`
3. 选择 `E:\portfolio\comfyui_workflow\wuxia_motion_comic.json`
4. 点击 `Queue Prompt` 开始生成

### 方法2：使用脚本自动运行

```bash
cd E:\portfolio\comfyui_workflow
python ../scripts/run_workflow.py \
  --workflow wuxia_motion_comic.json \
  --args '{"seed": 12345, "steps": 30, "prompt": "武侠风格，大雪纷飞"}' \
  --output-dir ./outputs
```

---

## 四、分镜制作流程

### Step 1: 为每个镜头生成图片

使用工作流中的SDXL部分，为每个分镜生成图片：

**镜1 - 古镇远景：**
```
武侠电影风格，大雪纷飞的江南古镇，远处可见客栈招牌在风雪中摇晃，
青石板路，古树枝头积雪，电影感，冷色调
```

**镜2 - 客栈内部：**
```
武侠客栈内部，中年掌柜擦着瓷杯，炉火微弱，窗外风雪，暖黄灯光
```

**镜3 - 剑客背影：**
```
剑客背影，青色长衫，斗笠滴水，腰间长剑，坐在客栈角落，炉火映照
```

（其余镜头同理）

### Step 2: 添加角色一致性（IP-Adapter）

如果要保持角色一致，需要添加：

1. 先生成角色参考图
2. 添加 IP-Adapter 节点
3. 在每个分镜中引用参考图

**添加IP-Adapter节点：**
```json
"10": {
    "class_type": "IPAdapterApply",
    "inputs": {
        "ipadapter": ["11", 0],
        "clip_vision": ["12", 0],
        "image": ["参考图节点", 0],
        "model": ["1", 0]
    }
}
```

### Step 3: 动画化

使用AnimateDiff将图片转为视频：

1. 加载图片节点（LoadImage）
2. 连接KSampler（denoise设为0.5-0.7）
3. 输出视频

### Step 4: 镜头运动控制

使用ControlNet控制镜头：

- **Depth ControlNet：** 控制景深变化（推近/拉远）
- **Line Art ControlNet：** 保持线条稳定

---

## 五、关键参数说明

### SDXL生成参数

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| Width | 1280 | 16:9比例 |
| Height | 720 | 16:9比例 |
| Steps | 30 | 质量与速度平衡 |
| CFG | 7.5 | 提示词跟随强度 |
| Sampler | dpmpp_2m | 稳定高质量 |

### AnimateDiff参数

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| Frames | 16 | 约2秒（8fps） |
| Frame Rate | 8 | 动态漫画常用帧率 |
| Motion Module | mm_sd_v15_v2 | SD1.5运动模块 |

### 视频合成参数

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| Format | video/h264-mp4 | 通用格式 |
| Pingpong | False | 不循环播放 |

---

## 六、优化技巧

### 1. 角色一致性

使用 **IP-Adapter** 或 **LoRA**：

- 先生成一张角色设定图
- 在所有分镜中引用这张图
- 或使用专门的武侠角色LoRA

### 2. 镜头运动

使用 **ControlNet Depth**：
- 生成深度图控制景深
- 推镜：深度图中心区域压缩
- 拉镜：深度图边缘区域扩展

### 3. 风格统一

使用 **Style LoRA**：
- 加载武侠风格LoRA
- 或在提示词中固定风格关键词

### 4. 批量生成

使用工作流批量模式：
```bash
python ../scripts/run_batch.py \
  --workflow wuxia_motion_comic.json \
  --count 7 \
  --output-dir ./outputs
```

---

## 七、问题排查

### 问题1：缺少节点

```
ModuleNotFoundError: No module named 'comfyui_animatediff'
```
**解决：**
```bash
comfy node install comfyui-animatediff-evolved
```

### 问题2：模型路径错误

```
FileNotFoundError: Checkpoint not found
```
**解决：** 确认模型在正确路径：
- SDXL：`models/checkpoints/sd_xl_base_1.0.safetensors`
- AnimateDiff：`models/animatediff_models/mm_sd_v15_v2.ckpt`

### 问题3：显存不足

**解决：**
- 降低分辨率（1024x576）
- 减少帧数（8帧）
- 使用 `--lowvram` 参数启动ComfyUI

---

## 八、下一步

1. **完善工作流**：添加更多ControlNet节点
2. **批量生产**：一次生成所有分镜
3. **后期合成**：导入剪映添加配音和字幕
4. **风格优化**：训练专用LoRA保持风格统一

---

## 文件位置

- Workflow JSON：`E:\portfolio\comfyui_workflow\wuxia_motion_comic.json`
- 输出目录：`E:\portfolio\comfyui_workflow\outputs\`
- 参考文档：`E:\portfolio\武侠动态漫画测试方案.md`
