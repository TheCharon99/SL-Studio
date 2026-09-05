# -*- coding: utf-8 -*-
"""正确添加8个新项目"""
import re

file_path = r"E:/portfolio/yier-studio/project-detail.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 新添加的项目（使用与现有项目相同的格式）
new_projects = """
    '凤凰城133': {
        name: '凤凰城133',
        designer: '懿贰设计',
        location: '上海·金山',
        desc: '现代简约公寓设计，注重空间利用。',
        images: ['images/凤凰城133/cover.jpg', 'images/凤凰城133/1.jpg', 'images/凤凰城133/2.jpg', 'images/凤凰城133/3.jpg', 'images/凤凰城133/4.jpg', 'images/凤凰城133/5.jpg', 'images/凤凰城133/6.jpg', 'images/凤凰城133/7.jpg']
    },
    '观唐府145': {
        name: '观唐府145',
        designer: '懿贰设计',
        location: '上海·金山',
        desc: '温馨公寓设计，柔和色调营造居家氛围。',
        images: ['images/观唐府145/cover.jpg', 'images/观唐府145/1.jpg', 'images/观唐府145/2.jpg', 'images/观唐府145/3.jpg', 'images/观唐府145/4.jpg', 'images/观唐府145/5.jpg', 'images/观唐府145/6.jpg', 'images/观唐府145/7.jpg']
    },
    '观唐府34-301': {
        name: '观唐府34-301',
        designer: '懿贰设计',
        location: '上海·金山',
        desc: '简约现代公寓，强调空间通透感。',
        images: ['images/观唐府34-301/cover.jpg', 'images/观唐府34-301/1.jpg', 'images/观唐府34-301/2.jpg', 'images/观唐府34-301/3.jpg', 'images/观唐府34-301/4.jpg', 'images/观唐府34-301/5.jpg', 'images/观唐府34-301/6.jpg', 'images/观唐府34-301/7.jpg']
    },
    '观唐府下叠': {
        name: '观唐府下叠',
        designer: '懿贰设计',
        location: '上海·金山',
        desc: '叠墅公寓设计，融合现代与舒适元素。',
        images: ['images/观唐府下叠/cover.jpg', 'images/观唐府下叠/1.jpg', 'images/观唐府下叠/2.jpg', 'images/观唐府下叠/3.jpg', 'images/观唐府下叠/4.jpg', 'images/观唐府下叠/5.jpg', 'images/观唐府下叠/6.jpg', 'images/观唐府下叠/7.jpg']
    },
    '汇龙府129': {
        name: '汇龙府129',
        designer: '懿贰设计',
        location: '上海·金山',
        desc: '精致公寓设计，注重细节与品质。',
        images: ['images/汇龙府129/cover.jpg', 'images/汇龙府129/1.jpg', 'images/汇龙府129/2.jpg', 'images/汇龙府129/3.jpg', 'images/汇龙府129/4.jpg', 'images/汇龙府129/5.jpg', 'images/汇龙府129/6.jpg', 'images/汇龙府129/7.jpg']
    },
    '汇龙府1-301': {
        name: '汇龙府1-301',
        designer: '懿贰设计',
        location: '上海·金山',
        desc: '现代风格公寓，简洁而不失格调。',
        images: ['images/汇龙府1-301/cover.jpg', 'images/汇龙府1-301/1.jpg', 'images/汇龙府1-301/2.jpg', 'images/汇龙府1-301/3.jpg', 'images/汇龙府1-301/4.jpg', 'images/汇龙府1-301/5.jpg', 'images/汇龙府1-301/6.jpg', 'images/汇龙府1-301/7.jpg']
    },
    '金玥湾15-101': {
        name: '金玥湾15-101',
        designer: '懿贰设计',
        location: '上海·金山',
        desc: '湾景公寓设计，视野开阔采光良好。',
        images: ['images/金玥湾15-101/cover.jpg', 'images/金玥湾15-101/1.jpg', 'images/金玥湾15-101/2.jpg', 'images/金玥湾15-101/3.jpg', 'images/金玥湾15-101/4.jpg', 'images/金玥湾15-101/5.jpg', 'images/金玥湾15-101/6.jpg', 'images/金玥湾15-101/7.jpg']
    },
    '龙泽苑22号401': {
        name: '龙泽苑22号401',
        designer: '懿贰设计',
        location: '上海·金山',
        desc: '高层公寓设计，功能性与舒适性为主。',
        images: ['images/龙泽苑22号401/cover.jpg', 'images/龙泽苑22号401/1.jpg', 'images/龙泽苑22号401/2.jpg', 'images/龙泽苑22号401/3.jpg', 'images/龙泽苑22号401/4.jpg', 'images/龙泽苑22号401/5.jpg', 'images/龙泽苑22号401/6.jpg', 'images/龙泽苑22号401/7.jpg']
    }"""

# 在最后一个项目（银天直播间）的 } 后插入新项
# 找到银天直播间的结束位置
pattern = r"('银天直播间': \{[^}]+\})\n(\});"
match = re.search(pattern, content)

if match:
    insert_pos = match.end()
    new_content = content[:insert_pos] + new_projects + "\n" + content[insert_pos:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ 已成功添加8个新项目")
    print(f"总项目数: {content.count('name:')} + 8 = {content.count('name:') + 8}")
else:
    print("❌ 未找到插入位置")
