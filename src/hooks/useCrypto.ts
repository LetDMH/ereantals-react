import CryptoJS from "crypto-js"

export default function useCrypto() {
  const SECRET_KEY = "6F1C7FCBdAa4EDed"

  // 加密
  function encrypt(txt: string) {
    // 统一将传入的字符串转成UTF8编码
    const key = CryptoJS.enc.Utf8.parse(SECRET_KEY)
    const str = CryptoJS.enc.Utf8.parse(txt)

    // 加密
    return CryptoJS.AES.encrypt(str, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
  }
  // 解密
  function decrypt(txt: string) {
      const key = CryptoJS.enc.Utf8.parse(SECRET_KEY)
      const str = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64.parse(txt))
      return  CryptoJS.AES.decrypt(str, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8)
  }

  return {
    encrypt,
    decrypt
  }
}
