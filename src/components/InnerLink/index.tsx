import { Spin } from "antd"
import { useState, useEffect } from "react"

const InnerLink: React.FC<{
  src?: string
  id?: string
}> = ({ src = "", id = "" }) => {
  const [loading, setLoading] = useState(false)
  const [height, setHeight] = useState("")
  const [iframeId, setIframeId] = useState("")

  const iframe: any = document.querySelector(iframeId)
  // iframe页面loading控制
  if (iframe.attachEvent) {
    setLoading(true)
    iframe.attachEvent("onload", () => {
      setLoading(false)
    })
  } else {
    setLoading(true)
    iframe.onload = function () {
      setLoading(false)
    }
  }

  setIframeId(("#" + id).replace(/\//g, "\\/"))

  useEffect(() => {
    setHeight(document.documentElement.clientHeight - 94.5 + "px")
  }, [])

  return (
    <div style={{ height }}>
      {loading ? (
        <Spin tip="正在加载页面，请稍候！"></Spin>
      ) : (
        <iframe
          id={iframeId}
          className="w-[100%] h-[100%]"
          src={src}
          frameBorder="no"
        />
      )}
    </div>
  )
}

export default InnerLink
