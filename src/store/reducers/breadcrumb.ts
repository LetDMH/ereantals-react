interface breadcrumbState {
  breadcrumbList: any[]
}

const breadcrumbState = {
  breadcrumbList: []
}

const breadcrumbReducer = (
  state: breadcrumbState = breadcrumbState,
  { type, payload }: IAction
) => {
  switch (type) {
    case "SET_BREADCRUMB_LIST":
      return {
        ...state,
        breadcrumbList: payload
      }
    case "UPDATE_BREADCRUMB_TITLE":
        for (let breadcrumb of state.breadcrumbList) {
            if (breadcrumb.name === payload.name) {
                breadcrumb.meta.title = payload.title
                break
            }
        }
  }
  return state
}

export default breadcrumbReducer
