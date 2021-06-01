const initState = {
  isLogged: false,
  token: null,
  userName: null,
  userEmail: null,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogged: true,
        token: action.data.token,
        userEmail: action.data.userEmail
      };
    case 'LOGOUT':
      return {
        ...state,
        isLogged: false,
        token: null,
        userEmail: null,
      }
    default:
      return state;
  }

};

export default reducer;
