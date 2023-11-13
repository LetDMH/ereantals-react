import "./index.less"
import classNames from "classnames"

export default function SvgIcon({
  name,
  prefix = "icon",
  color = "",
  className = "",
  ...props
}) {
  const symbolId = `#${prefix}-${name}`

  return (
    <svg
      className={classNames("svg-icon", className)}
      {...props}
      aria-hidden="true"
    >
      <use href={symbolId} fill={color} />
    </svg>
  )
}
