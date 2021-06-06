const initState = {
  isLogged: false,
  token: null,
  userName: null,
  userEmail: null,
  refresh: false,
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
    case 'REFRESH':{
      return {
        ...state,
        refresh: !state.refresh
      }
    }
    default:
      return state;
  }

};

export default reducer;
