# TransE、DistMult、ComplEx这些知识图谱嵌入方法有什么区别？

日期：2026-09-27  
标签：#面试 #AI应用开发 #RAG #知识工程  
难度：中等  
来源：[牛面题目详情](https://niumianoffer.com/nm_practice/questions/q_1762135135225731983?activeIndex=0&from=bank_1762132162559495793)

## 一句话答案

TransE、DistMult和ComplEx的主要差别是三元组评分函数，因此擅长表达的关系模式不同。

## 面试回答要点

- TransE把关系视为头实体到尾实体的向量平移。
- DistMult采用对称的双线性评分，难以表示有方向的非对称关系。
- ComplEx用复数嵌入与共轭运算表达非对称关系；比较时还要看训练与推理成本。

## 自测

- 不看笔记，用 60 秒回答：TransE、DistMult、ComplEx这些知识图谱嵌入方法有什么区别？
- 结合自己的项目，补充一个具体场景、指标或取舍。
