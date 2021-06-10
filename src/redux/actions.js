export const login = (userData) => ({
  type: "LOGIN",
  data: userData
})

export const logout = () => ({
  type: "LOGOUT",
})

export const refresh = () => ({
  type: "REFRESH",
})

export const showAlert = (alert) => ({
  type: "ALERT",
  data: alert
})

export const cleanAlert = () => ({
  type: "CLEAN_ALERT",
})





