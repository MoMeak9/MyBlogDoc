# 什么是Hypothetical Document Embeddings（HyDE）？如何提升检索效果？

日期：2026-09-27  
标签：#面试 #AI应用开发 #RAG #知识工程  
难度：中等  
来源：[牛面题目详情](https://niumianoffer.com/nm_practice/questions/q_1762135135254145167?activeIndex=0&from=bank_1762132162559495793)

## 一句话答案

HyDE先让模型生成一段假设性的答案文档，再用其向量检索真实文档，以缩小问题措辞与文档表达之间的差距。

## 面试回答要点

- 用户问题先生成候选答案文本，再对该文本做embedding。
- 向量检索返回的仍是知识库里的真实证据，假设文档本身不能当事实。
- 适用于查询短而文档表达丰富的场景，需评估生成偏差、延迟和成本。

## 自测

- 不看笔记，用 60 秒回答：什么是Hypothetical Document Embeddings（HyDE）？如何提升检索效果？
- 结合自己的项目，补充一个具体场景、指标或取舍。
