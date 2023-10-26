const userState = {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: []
}

const userReducer = (state = userState, { type, payload }: IAction) => {
  switch (type) {
    case "SET_ROUTES":
      return { ...state, routes: payload }
  }
  return state
}

export default userReducer
