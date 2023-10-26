import { getToken } from "@/utils"

const userState = {
  token: getToken(),
  name: "",
  avatar: "",
  roles: [],
  permissions: [],
  userInfo: {}
}

const userReducer = (state = userState, { type, payload }: IAction) => {
  switch (type) {
    case "SET_TOKEN":
      return { ...state, token: payload }
    case "SET_USER_INFO":
      return { ...state, userInfo: payload }
    case "SET_ROLES":
      return { ...state, roles: payload }
    case "SET_PERMISSIONS":
      return { ...state, permissions: payload }
    case "SET_NAME":
      return { ...state, name: payload }
    case "SET_AVATAR":
      return { ...state, avatar: payload }
  }
  return state
}

export default userReducer
