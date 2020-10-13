/**
 * 队列 特点：先进先出
 */
class Queue {
  private items: number[] = [];
  enqueue(element: number) {
    this.items.push(element);
  }
  dequeue(): number {
    return this.items.shift();
  }
  print() {
    console.log(this.items.toString());
  }
}
let queue = new Queue();
queue.enqueue(1);
queue.print(); // 1
queue.enqueue(2);
queue.print(); // 1,2
queue.enqueue(3);
queue.print(); // 1,2,3
queue.dequeue();
queue.print(); // 2,3
queue.dequeue();
queue.print(); // 3
queue.dequeue();
queue.print(); // 
