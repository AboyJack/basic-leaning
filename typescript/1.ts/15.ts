/**
 * 类型声明
 * 声明文件可以让我们不需要将JS重构为TS 只需要加上声明文件就可以使用系统
 * 类型声明在编译的时候会被删除 不会影响真正的代码
 * 
 * 声明文件怎么写？
 * 1. 重写
 * 2. 配上声明文件
 * 3. 
 */

// 普通类型声明
declare const $: (selector: string) => {
  click(): void
  width(length: number): void
}
$('#root').click()
$('#root').width(100)

declare let name: String
declare let age: number
declare function getName(): string
declare class Animal { name: string }

interface Person {
  name: string
}
type Student = Person | string

declare enum Season {
  Spring, Summer, Autumn, Winter
}
let season: Season[] = [
  Season.Spring,
  Season.Summer,
  Season.Autumn,
  Season.Winter
]
console.log(season)
export { }