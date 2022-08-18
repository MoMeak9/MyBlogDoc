---
date: 2022-08-17
category:
- TypeScript
---

# 函数泛型

## 箭头函数泛型

直接以内嵌式书写的箭头函数泛型，以复用函数

```ts
const foo = <T,>(x: T): T => x;

const foo = <T extends {}>(x: T): T => x;

const foo = <T extends Record<string, unknown>>(x: T): T => x;

const foo: <T>(x: T) => T = x => x;

const identity = <T,>(arg: T): T => {
    console.log(arg);
    return arg;
};

const renderAuthorize = <T>(Authorized: T): ((currentAuthority: CurrentAuthorityType) => T) => (
    currentAuthority: CurrentAuthorityType,
  ): T => {
     return
 };
```

## 普通函数泛型

```ts
/**
 * 获取数组中最小值 (T泛型通用)
 * @param {T[]} arr
 * @returns {T}
 */
function getMin<T>(arr:T[]):T{
   var min=arr[0];
   arr.forEach((value)=>{
      if(value<min){
          min=value;
      }
   });
    return min;
}
 
console.log(getMin([1, 3, 5, 7, 8]));
console.log(getMin(["tom","jerry","jack","sunny"]));
```

### 类中的函数泛型（泛型类）

```ts
class GetMin<T>{
     arr:T[]=[];
     add(ele:T){
         this.arr.push(ele);
     }
    min():T{
       var min=this.arr[0];
       this.arr.forEach(function (value) {
          if(value<min){
              min=value;
          }
       });
       return min;
    }
}
  var gm1= new  GetMin<number>();
   gm1.add(5);
   gm1.add(3);
   gm1.add(2);
   gm1.add(9);
console.log(gm1.min());
 
var gm2= new  GetMin<string>();
gm2.add("tom");
gm2.add("jerry");
gm2.add("jack");
gm2.add("sunny");
console.log(gm2.min());
```

### 泛型函数接口

```ts
interface ConfigFn{
    <T>(value:T):T;
}
 
var getData:ConfigFn=function<T>(value:T):T{
    return value;
}
getData<string>('张三');
// getData<string>(1243);  //错误
 
 
// 类似  Map<String,Object> Param  接口
interface Param{
    [index:string]:any
}
```

## 泛型类接口

```ts
/**
 * page分页对象
 */
class Page{
    private currentPage:number=1; //当前页码 默认1
    private pageSize:number=10;//每页条数 默认为10
    private sortName:string; //排序字段
    private sortOrder:string="asc"; // 排序规则 asc | desc 默认为asc正序
 
 
     constructor(param:Param){
         if(param["currentPage"]){
             this.currentPage=param["currentPage"];
         }
         if(param["pageSize"]){
             this.pageSize=param["pageSize"];
         }
         if(param["sortName"]){
             this.sortName=param["sortName"];
         }
         if(param["sortOrder"]){
             this.sortOrder=param["sortOrder"];
         }
     }
 
    public    getStartNum():number{
        return   (this.currentPage-1)*this.pageSize;
    }
}
 
 
class User{
     id:number;//id主键自增
     name:string;//姓名
     sex:number;//性别 1男 2女
     age:number;//年龄
     city:string;//城市
     describe:string;//描述
}
```

## 泛型接口

```ts
interface  BaseDao<T> {
     findById(id:number):T;//根据主键id查询一个实体
     findPageList(param:Param,page:Page):T[];//查询分页列表
     findPageCount(param:Param):number;//查询分页count
     save(o:T):void;//保存一个实体
     update(o:T):void;//更新一个实体
     deleteById(id:number);//删除一个实体
}
```

## 接口实现类

```ts
class UserDao<User> implements BaseDao<User>{
     findById(id:number):User{
 
        return null;
     }
    findPageList(param:Param,page:Page):User[]{
         return [];
    }
    findPageCount(param:Param):number{
         return   0;
    }
    save(o:User):void{
 
    }
    update(o:User):void{
 
    }
    deleteById(id:number){

    }
}
```

