export const TOKEN_KEY = "BUSSOL@R";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setName = name => localStorage.setItem('nome', name);
export const getName = () => localStorage.getItem('nome');