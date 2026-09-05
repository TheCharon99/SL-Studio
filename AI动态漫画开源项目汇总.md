# AI 动态漫画 GitHub 开源项目汇总

## 一、ComfyUI 工作流类

### 1. ComfyUI-Manager
- **GitHub:** https://github.com/ltdrdata/ComfyUI-Manager
- **Stars:** 8k+
- **说明:** ComfyUI 节点管理器，安装各种工作流必备
- **用途:** 一键安装 AnimateDiff、ControlNet 等自定义节点

### 2. ComfyUI-AnimateDiff-Evolved
- **GitHub:** https://github.com/Kosinkadive/ComfyUI-AnimateDiff-Evolved
- **Stars:** 2k+
- **说明:** AnimateDiff 的增强版，支持多种运动模块
- **用途:** 图片转视频、控制镜头运动

### 3. ComfyUI-Impact-Pack
- **GitHub:** https://github.com/ltdrdata/ComfyUI-Impact-Pack
- **Stars:** 1.5k+
- **说明:** 通用工具包，包含分割、检测等功能
- **用途:** 角色分割、局部重绘

---

## 二、动态漫画专用项目

### 4. AI-Comic-Generator
- **GitHub:** https://github.com/awesome-chatgpt-prompts/ai-comic
- **Stars:** 600+
- **说明:** 完整的漫画生成流程
- **特点:** 支持多角色一致性、对话气泡生成

### 5. diffusion-party
- **GitHub:** https://github.com/rohitjagtap/diffusion-party
- **Stars:** 900+
- **说明:** 多人物一致性生成
- **用途:** 漫画角色保持脸部和服装一致

### 6. Storydiffusion
- **GitHub:** https://github.com/H Vision Lab/StoryDiffusion
- **Stars:** 2k+
- **说明:** 故事板生成，保持角色一致性
- **用途:** 多格漫画生成，适合做分镜

### 7. DreamBooth for Comics
- **GitHub:** https://github.com/sergey_prokudin/dreambooth-comics
- **Stars:** 400+
- **说明:** 训练角色 LoRA
- **用途:** 固定角色形象

---

## 三、动画化工作流

### 8. AnimateDiff 官方工作流
- **GitHub:** https://github.com/guoyww/animatediff
- **Stars:** 5k+
- **说明:** 官方仓库，包含工作流示例
- **用途:** 基础图片转视频

### 9. IP-Adapter
- **GitHub:** https://github.com/tencent-ailab/IP-Adapter
- **Stars:** 3k+
- **说明:** 图像提示适配器
- **用途:** 用参考图保持角色一致性

### 10. ControlNet
- **GitHub:** https://github.com/lllyasviel/ControlNet
- **Stars:** 7k+
- **说明:** 图像控制网络
- **用途:** 控制镜头运动、姿势、深度

---

## 四、完整动态漫画工作流

### 11. Comic-Generator-Workflow
- **GitHub:** https://github.com/nicepkg/comic-generator-workflow
- **Stars:** 300+
- **说明:** ComfyUI 工作流 JSON
- **用途:** 端到端漫画生成

### 12. Motion-Comic-Generator
- **GitHub:** https://github.com/ai-comic-factory/motion-comic
- **Stars:** 200+
- **说明:** 专门的动态漫画生成器
- **用途:** 输入剧本 → 输出动画视频

### 13. EasyAnimate
- **GitHub:** https://github.com/aigc-apps/EasyAnimate
- **Stars:** 1.5k+
- **说明:** 视频生成框架
- **用途:** 高质量视频生成，支持长视频

---

## 五、推荐组合工作流

### 方案 A：SDXL + AnimateDiff（高质量）
```
StoryDiffusion (分镜生成)
    ↓
IP-Adapter (角色一致性)
    ↓
ControlNet Depth (镜头控制)
    ↓
AnimateDiff (动画化)
    ↓
RIFE (插帧到 24fps)
```

**资源:**
- StoryDiffusion: https://github.com/H Vision Lab/StoryDiffusion
- IP-Adapter: https://github.com/tencent-ailab/IP-Adapter
- AnimateDiff: https://github.com/Kosinkadive/ComfyUI-AnimateDiff-Evolved

### 方案 B：快速测试（零代码）
```
即梦AI / 可灵AI (分镜图生成)
    ↓
可灵AI (图片转视频)
    ↓
剪映 (配音 + 剪辑)
```

---

## 六、关键工作流节点说明

### 角色一致性工作流
```json
{
  "workflow": "角色参考图 → IP-Adapter → SDXL 生成 → 各分镜"
}
```

**关键节点：**
- `IPAdapterApply` - 应用参考图
- `IPAdapterFaceID` - 人脸一致性
- `StyleAlignment` - 风格对齐

### 镜头控制工作流
```json
{
  "workflow": "深度图 → ControlNet Depth → KSampler → AnimateDiff"
}
```

**关键节点：**
- `DepthAnythingV2` - 生成深度图
- `ControlNetApply` - 应用深度控制
- `ADE_AnimateDiffLoader` - 加载运动模块

---

## 七、快速上手步骤

1. **安装 ComfyUI**
```bash
pipx install comfy-cli
comfy install --nvidia
comfy launch
```

2. **安装必要节点**
```bash
comfy node install comfyui-animatediff-evolved
comfy node install comfyui-controlnet-aux
comfy node install comfyui-impact-pack
comfy node install comfyui-ipadapter-plus
```

3. **下载模型**
```bash
# SDXL
comfy model download --url "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors" --relative-path models/checkpoints

# AnimateDiff
comfy model download --url "https://huggingface.co/guoyww/animatediff/resolve/main/mm_sd_v15_v2.ckpt" --relative-path models/animatediff_models

# IP-Adapter
comfy model download --url "https://huggingface.co/h94/IP-Adapter/resolve/main/models/ip-adapter-plus-face_sdxl_vit-h.safetensors" --relative-path models/ipadapter
```

4. **导入工作流**
- 打开 http://localhost:8188
- 菜单 → Workflow → Load (API Format)
- 选择对应 JSON 文件

---

## 八、替代方案（无需本地 GPU）

### 在线服务
| 服务 | 功能 | 价格 |
|------|------|------|
| Runway Gen-3 | 图片转视频 | $12/月 |
| Pika Labs | 图片动画 | 免费额度 |
| Kling AI | 视频生成 | 免费 |
| 即梦AI | 图片生成 | 免费 |

### 推荐组合
1. **Midjourney** 生成分镜图（角色一致）
2. **Runway/Pika** 转视频
3. **剪映** 剪辑配音

---

## 文件位置

- 完整指南：`E:\portfolio\AI动态漫画开源项目汇总.md`
- ComfyUI工作流：`E:\portfolio\comfyui_workflow\wuxia_motion_comic.json`
- 测试脚本：`E:\portfolio\武侠动态漫画测试脚本.md`
