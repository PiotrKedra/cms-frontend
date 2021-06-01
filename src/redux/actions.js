export const login = (userData) => ({
  type: "LOGIN",
  data: userData
})

export const logout = () => ({
  type: "LOGOUT",
})
