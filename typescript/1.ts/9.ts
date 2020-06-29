/**
 * 类型的保护
 * 就是更精确的知道是哪种类型
 */
namespace a {
  function double(input: string | number | boolean) {
    if (typeof input === 'string') {
      input.toUpperCase()
    } else if (typeof input === 'number') {
      input.toFixed(2)
    } else {
      input
    }
  }
  class Animal {
    public name: string = 'aa'
  }
  class Bird extends Animal {
    public swing: number = 2
  }
  function getName(a: Animal) {
    if (a instanceof Bird) {
      a.swing
    } else {
      a.name
    }
  }
  // null 保护
  function getFirstLetter(s: string | null) {
    // if (s === null) {
    //   s = ''
    // }
    // s = s || ''
    function ensure() {
      s = s || ''
    }
    ensure()
    return s!.charAt(0) // 非空断言
  }

  let a = { b: 1 }
  // 先判断a是否为null 或者 undefined 如果是直接返回null 否则返回a.b
  console.log(a?.b)
  // a ? a.b : a

  interface WarningButton {
    class: 'warning',
    text1: '修改'
  }
  interface DangerButton {
    class: 'danger',
    text2: '删除'
  }
  type Button = WarningButton | DangerButton
  function getButton(button: Button) {
    if (button.class === 'warning') {
      button.text1
    } else {
      button.text2
    }
  }

  interface Bird {
    swing: number
  }
  interface Dog {
    leg: number
  }
  function getNumber(x: Bird | Dog) {
    if ('swing' in x) {
      x.swing
    } else {
      x.leg
    }
  }
}

namespace b {
  // 自定义的类型保护
  interface Bird {
    name: 'Bird',
    legs: number
  }
  interface Dog {
    name: 'Dog',
    legs: number
  }
  function isBird(x: Bird | Dog): x is Bird {
    return x.legs === 2
  }
  function getAnimal(x: Bird | Dog) {
    if (isBird) {
      x.legs // x就为Bird
    } else {
      x.legs // x就为其他
    }
  }
  let x: Bird = { name: 'Bird', legs: 2 }
  getAnimal(x)
}