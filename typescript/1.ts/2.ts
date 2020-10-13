// 函数定义
function hello(name: string): void {
  console.log(`hello ${name}`)
}
// type 定义一个类型或者函数别名 返回值{ name: string }
type GetUserNameType = (firstName: string, lastName: string) => { name: string }
type GetUserNameType2 = (firstName: string, lastName: string) => void
// 函数表达式
let getUserName: GetUserNameType = function (firstName: string, lastName: string): { name: string } {
  return {
    name: firstName + lastName
  }
}
let getUserName2: GetUserNameType2 = function (firstName: string, lastName: string): void { }
// 可选参数
function print(name: string, age?: number, home?: string) {

}
print();
print('hello');
print('hello', 20, 'sz');

// 默认参数
function ajax(url: string, method: string = 'POST') {
  console.log(url, method)
}
ajax('/login')
ajax('/login', 'GET')

// 剩余函数
function sum(...numbers: Array<number>) {
  return numbers.reduce((accu, item) => accu + item, 0);
}

/**
 * 函数重载
 * 重载的定义和函数声明要依次在一起
 */
let obj: any = {};
function attr(val: string): void;
function attr(val: number): void;
function attr(val: any): void {
  if (typeof val === 'string') {
    obj.name = val;
  } else if (typeof val === 'number') {
    obj.age = val;
  }
}
attr('jj');
attr(20);
// attr(true);
console.log(obj);

function sum2(a: string, b: string): void;
function sum2(a: number, b: number): void;
function sum2(a: any, b: any) {
  return a + b
}
sum2('a', 'b');
sum2(1, 1);