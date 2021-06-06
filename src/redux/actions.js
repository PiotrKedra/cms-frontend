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


