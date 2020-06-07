
// 如果代码里有 export import 之类的代码 name这个文件就会变成一个模块
let name: String = 'hello';
let age: number = 20;
let married: boolean = true;
let hobbies: string[] = ['1', '2', '3'];
let interests: Array<string> = ['4', '5', '6'];

/**
 * 元组 类似一个数组 他是一个长度和类型都固定的数组 特点有：
 * 1. 长度固定
 * 2. 类型可以不一样
 */
let point: [number, number] = [100, 100];
point[0], point[1];
const person: [string, number, boolean] = ['hello', 20, false];

/**
 * 枚举
 * 普通枚举可以改 常量枚举不能更改
 */
enum Gender {
  BOY,
  GIRL
}
console.log(`T is ${Gender.GIRL}`)

enum Week {
  DAY = 'd', // 只能赋值数字或字符串
  MON = 'm'
}
console.log(Week.DAY)

// 常量枚举 
const enum Colors {
  Red,
  Yellow,
  Blue
}
console.log(Colors.Red, Colors.Yellow, Colors.Blue)
/**
 * 任意类型 anyscript
 * 一般什么时候用到？第三方库没有类型 类型转换的时候 数据结构太复杂太灵活 尽量少用
 */
let aaaa: any = {}

// ts 为 dom 提供了一整套的类型声明
// let root = document.getElementById('root');
// root!.style.color = 'red'; // ! 断言不为空

// null 空 undefined 未定义 它们都有其他类型的子类型 你可以把它们赋给其他类型的变量 配置"strictNullChecks": false,
const n1: string = null;
const n2: string = undefined;

let x: number;
x = 1;
x = undefined;
x = null;

/**
 * void 类型 
 * 空  没有
 */
function greeting(name: string): void {
  console.log(`hello ${name}`);
}
greeting('word');

/**
 * never 永不
 * never 是其它类型的子类型，代表不会出现的值
 * 在函数内部会永远抛出错误，导致函数无法正常结束
 * 例如场景需求：
 * 1. 如果启动一个后台任务，就是一个死循环 事件环函数 计划任务
 * 2. 写一些单元测试
 */
function createError(message: string): never {
  throw new Error('error');
  console.log('end point')
}
function sum() {
  while (true) {
    console.log('hello')
  }
  console.log('end point')
}

// 类型推论
let x1 = 2;
x1 = 4;

let x2;
x2 = 4;
x2 = 'ddd';

/**
 * 包装对象
 *  比如 Java中的装箱和拆箱
 *  自动的在基本类型和对象类型之间切换
 *  1. 基本类型上没有方法
 *  2. 在内部迅速的完成一个装箱操作，把基本类型包装成对象类型，然后用对象来调用方法
 */
let d1: string = 'h';
// d2 = new String(d1)
d1.toLocaleLowerCase();

/**
 * 联合类型
 */
let n5: string | number;
n5 = 'j';
n5.toLocaleLowerCase();
n5 = 22;
n5.toFixed(2);

let n6: string | number;
let n7: string | number = n6;
(n6 as string).toLocaleLowerCase();
(n7 as number).toFixed(2);

/**
 * 字面量类型
 */
let Gender2: 'Boy' | 'Girl';
Gender2 = 'Boy'
Gender2 = 'Girl'

export { }
