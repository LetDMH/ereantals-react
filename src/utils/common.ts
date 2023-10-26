/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: any) {
  let result = ""
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = encodeURIComponent(propName) + "="
    // if (value !== null && typeof value !== 'undefined' && value !== '') {
    if (value !== null && typeof value !== "undefined" && value !== "") {
      if (typeof value === "object" && !Array.isArray(value)) {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            const params = propName + "[" + key + "]"
            const subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        if (Array.isArray(value) && !value.length) continue
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}

// 获取url参数
export function getQueryStr(name: string) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
