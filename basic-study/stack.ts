/**
 * 栈是一组数据的存放方式 特点是先进后出 后进先出
 * 栈也是存放数据的一种内存区域
 * 程序运行时，需要内存空间存放数据。一般来说系统会划分两种不同的内存空间：一种叫做stack（栈），另一种叫做heap（堆）
 *   stack是有结构的，每个区块按照一定次序存放，可以明确的知道每个区块的大小
 *   heap是没有结构的，数据可以任意存放。因此，stack寻址速度要比heap快。
 * 只要是局部的、占用空间确定的数据，一般都存放在stack里面，否则就放在heap里，所有对象都存放在heap中。
 */
class Stack {
  private items: number[] = [];
  push(element: number) {
    this.items.push(element);
  }
  pop(): number {
    return this.items.pop();
  }
}
let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();
stack.pop();
stack.pop();

// function one() {
//   function two() {
//     function three() {
//       console.log(1);
//     }
//     three();
//   }
//   two();
// }
// one();
