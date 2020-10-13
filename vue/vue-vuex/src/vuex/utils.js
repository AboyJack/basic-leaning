/**
 * 遍历对象并回调每个属性函数 key
 * @param {object} obj 
 * @param {callback} fn 
 */
export const getEachObjFnKey = (obj = {}, fn) => {
  Object.keys(obj).forEach((key, index) => fn(obj[key], key))
}