---
title: C语言训练营Chaptrt02
date: 2022-01-28
author: MoMeaks
sidebar: 'auto'
categories:
- 408
---

### 2.2 顺序表的增删查

```cpp
#include <stdio.h>
#include <stdlib.h>

#define MaxSize 50
typedef int ElemType;//顺序表中元素的类型
//静态分配
typedef struct {
	ElemType data[MaxSize];//定义的数组，用来存元素
	int length;//当前顺序表中有多少个元素
}SqList;

//i代表插入的位置，从1开始，e要插入的元素
bool ListInsert(SqList& L, int i, ElemType e)
{
	if (i<1 || i>L.length + 1)//判断要插入的位置是否合法
		return false;
	if (L.length >= MaxSize)//元素存储满了，不能再存了
		return false;
	for (int j = L.length; j >= i; j--)//移动顺序表中的元素，依次往后移动
		L.data[j] = L.data[j - 1];
	L.data[i - 1] = e;//数组下标从零开始，插入第一个位置，访问的下标为0
	L.length++;
	return true;//走到这里代表插入成功，返回true
}
//删除使用元素e的引用的目的是拿出对应的值
bool ListDelete(SqList& L, int i, ElemType& e)
{
	if (i<1 || i>L.length)//如果删除的位置是不合法
		return false;
	if (L.length == 0)//顺序表中没有元素，无需删除
	{
		return false;
	}
	e = L.data[i - 1];//获取顺序表中对应的元素，赋值给e
	for (int j = i; j < L.length; j++)//从i的位置依次把元素往前覆盖
		L.data[j - 1] = L.data[j];
	L.length--;//删除一个元素，顺序表长度减1
	return true;
}
//打印顺序表元素
void PrintList(SqList& L)
{
	for (int i = 0; i < L.length; i++)
	{
		printf("%3d", L.data[i]);//要求所有元素打印到一排
	}
	printf("\n");
}

//查找成功，返回位置，位置从1开始，查找失败，返回0
int LocateElem(SqList L, ElemType e)
{
	int i;
	for (i = 0; i < L.length; i++)//遍历顺序表
		if (L.data[i] == e)
			return i + 1;//加1就是元素在顺序表中的位置
	return 0;
}

int main()
{
	SqList L;//顺序表的名称
	bool ret;//查看返回值，布尔型是True,或者False
	ElemType del;//用来存要删除的元素
	//首先手动在顺序表中前三个元素赋值
	L.data[0] = 1;
	L.data[1] = 2;
	L.data[2] = 3;
	L.length = 3;//总计三个元素
	ret = ListInsert(L, 2, 60);//往第二个位置插入60这个元素
	if (ret)
	{
		printf("插入成功\n");
		PrintList(L);//打印成功后的顺序表
	}
	else {
		printf("插入失败\n");
	}
	ret = ListDelete(L, 1, del);//删除第一个位置的元素，并把元素值输出
	if (ret)
	{
		printf("删除成功\n");
		printf("删除元素值为 %d\n", del);
		PrintList(L);
	}
	else {
		printf("删除失败\n");
	}
	int elem_pos;
	elem_pos = LocateElem(L, 60);
	if (elem_pos)
	{
		printf("查找成功\n");
		printf("元素位置为 %d\n", elem_pos);//为了打印一下元素的位置
	}
	else {
		printf("查找失败\n");
	}
	return 0;
}
```



### 2.3 顺序表的链式展示

```cpp
#include <stdio.h>
#include <stdlib.h>

typedef int ElemType;
typedef struct LNode{
	ElemType data;
	struct LNode *next;//指向下一个结点 
}LNode,*LinkList;
//头插法新建链表
LinkList CreatList1(LinkList &L)//list_head_insert
{
	LNode *s;int x;
	L=(LinkList)malloc(sizeof(LNode));//带头结点的链表,不带头结点
	L->next=NULL;//L->data里边没放东西
	scanf("%d",&x);//从标准输入读取数据
	//3 4 5 6 7 9999
	while(x!=9999){
		s=(LNode*)malloc(sizeof(LNode));//申请一个空间空间，强制类型转换
		s->data=x;
		s->next=L->next;
		L->next=s;
		scanf("%d",&x);//读取标准输入
	}
	return L;
}
//尾插法新建链表
LinkList CreatList2(LinkList &L)//list_tail_insert
{
	int x;
	L=(LinkList)malloc(sizeof(LNode));//带头节点的链表
	LNode *s,*r=L;
	//3 4 5 6 7 9999
	scanf("%d",&x);
	while(x!=9999){
		s=(LNode*)malloc(sizeof(LNode));
		s->data=x;
		r->next=s;
		r=s;//r指向新的表尾结点
		scanf("%d",&x);
	}
	r->next=NULL;//尾结点的next指针赋值为NULL
	return L;
}
//按序号查找结点值
LNode *GetElem(LinkList L,int i)
{
	int j=1;
	LNode *p=L->next;
	if(i==0)
		return L;
	if(i<1)
		return NULL;
	while(p&&j<i)
	{
		p=p->next;
		j++;
	}
	return p;
}
//按值查找
LNode *LocateElem(LinkList L,ElemType e)
{
	LNode *p=L->next;
	while(p!=NULL&&p->data!=e)
		p=p->next;
	return p;
}
//新结点插入第i个位置
bool ListFrontInsert(LinkList L,int i,ElemType e)
{
	LinkList p=GetElem(L,i-1);
	if(NULL==p)
	{
		return false;
	}
	LinkList s=(LNode*)malloc(sizeof(LNode));//为新插入的结点申请空间
	s->data=e;
	s->next=p->next;
	p->next=s;
	return true;
}
//删除第i个结点
bool ListDelete(LinkList L,int i)
{
	LinkList p=GetElem(L,i-1);
	if(NULL==p)
	{
		return false;
	}
	LinkList q;
	q=p->next;
	p->next=q->next;//断链
	free(q);//释放对应结点的空间
	return true;
}
//打印链表中每个结点的值
void PrintList(LinkList L)
{
	L=L->next;
	while(L!=NULL)
	{
		printf("%3d",L->data);
		L=L->next;
	}
	printf("\n");
}
//《王道C督学营》课程
//2.3 线性表的链式表示
int main()
{
	LinkList L;//链表头
	LinkList search;//用来存储拿到的某一个节点
	//CreatList1(L);//输入数据可以为3 4 5 6 7 9999
	CreatList2(L);//输入数据可以为3 4 5 6 7 9999
	PrintList(L);
	search=GetElem(L,2);
	if(search!=NULL)
	{
		printf("按序号查找成功\n");
		printf("%d\n",search->data);
	}
	search=LocateElem(L,6);//按值查询
	if(search!=NULL)
	{
		printf("按值查找成功\n");
		printf("%d\n",search->data);
	}
	ListFrontInsert(L,2,99);//新结点插入第i个位置
	PrintList(L);
	ListDelete(L,4);//删除第4个结点
	PrintList(L);
	system("pause");
}
```



### 2.3.3 双向链表

```cpp
#include <stdio.h>
#include <stdlib.h>

typedef int ElemType;
typedef struct DNode{
	ElemType data;
	struct DNode *prior,*next;//前驱，后继
}DNode,*DLinkList;
//双向链表头插法
DLinkList Dlist_head_insert(DLinkList &DL)
{
	DNode *s;int x;
	DL=(DLinkList)malloc(sizeof(DNode));//带头结点的链表,不带头结点
	DL->next=NULL;
	DL->prior=NULL;
	scanf("%d",&x);//从标准输入读取数据
	//3 4 5 6 7 9999
	while(x!=9999){
		s=(DLinkList)malloc(sizeof(DNode));//申请一个空间空间，强制类型转换
		s->data=x;
		s->next=DL->next;
		if(DL->next!=NULL)//插入第一个结点时，不需要这一步操作
		{
			DL->next->prior=s;
		}
		s->prior=DL;
		DL->next=s;
		scanf("%d",&x);//读取标准输入
	}
	return DL;
}

//双向链表尾插法
DLinkList Dlist_tail_insert(DLinkList &DL)
{
	int x;
	DL=(DLinkList)malloc(sizeof(DNode));//带头节点的链表
	DNode *s,*r=DL;
	DL->prior=NULL;
	//3 4 5 6 7 9999
	scanf("%d",&x);
	while(x!=9999){
		s=(DNode*)malloc(sizeof(DNode));
		s->data=x;
		r->next=s;
		s->prior=r;
		r=s;//r指向新的表尾结点
		scanf("%d",&x);
	}
	r->next=NULL;//尾结点的next指针赋值为NULL
	return DL;
}
//按序号查找结点值
DNode *GetElem(DLinkList DL,int i)
{
	int j=1;
	DNode *p=DL->next;
	if(i==0)
		return DL;
	if(i<1)
		return NULL;
	while(p&&j<i)
	{
		p=p->next;
		j++;
	}
	return p;
}
//新结点插入第i个位置
bool DListFrontInsert(DLinkList DL,int i,ElemType e)
{
	DLinkList p=GetElem(DL,i-1);
	if(NULL==p)
	{
		return false;
	}
	DLinkList s=(DLinkList)malloc(sizeof(DNode));//为新插入的结点申请空间
	s->data=e;
	s->next=p->next;
	p->next->prior=s;
	s->prior=p;
	p->next=s;
	return true;
}
//删除第i个结点
bool DListDelete(DLinkList DL,int i)
{
	DLinkList p=GetElem(DL,i-1);
	if(NULL==p)
	{
		return false;
	}
	DLinkList q;
	q=p->next;
	if(q==NULL)//删除的元素不存在
		return false;
	p->next=q->next;//断链
	if(q->next!=NULL)
	{
		q->next->prior=p;
	}
	free(q);//释放对应结点的空间
	return true;
}
//链表打印
void PrintDList(DLinkList DL)
{
	DL=DL->next;
	while(DL!=NULL)
	{
		printf("%3d",DL->data);
		DL=DL->next;
	}
	printf("\n");
}

//《龙哥带你撸代码》课程
//2.3.3 双链表增删查
int main()
{
	DLinkList DL;
	DLinkList search;
	Dlist_head_insert(DL);
	//Dlist_tail_insert(DL);
	//3 4 5 6 7 9999
	PrintDList(DL);
	search=GetElem(DL,2);
	if(search!=NULL)
	{
		printf("按序号查找成功\n");
		printf("%d\n",search->data);
	}
	DListFrontInsert(DL,3,99);
	PrintDList(DL);
	DListDelete(DL,2);
	PrintDList(DL);
	system("pause");
}
```



### 2.3 作业

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

struct student {
	int num;
	char name[20];
	char sex;
};//声明一个结构体类型

int main()
{
	struct student s;
	scanf("%d%s %c", &s.num, s.name, &s.sex);//scanf传递时，为什么后面要给一个地址，指针的传递的使用场景
	printf("%d %s %c\n", s.num, s.name, s.sex);
	return 0;
}
```

