interface AppState {
  sidebar: {
    opened: boolean
    hide: boolean
  }
}

const appState = {
  sidebar: {
    opened: true,
    hide: false
  }
}

const appReducer = (state = appState, { type, payload }: IAction): AppState => {
  switch (type) {
    case "TOGGLE_SIDEBAR":
      if (state.sidebar.hide) return state
      return {
        ...state,
        sidebar: { ...state.sidebar, opened: !state.sidebar.opened }
      }
  }
  return state
}

export default appReducer
