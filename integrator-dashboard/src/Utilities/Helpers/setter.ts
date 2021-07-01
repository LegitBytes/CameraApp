export const setter = (e, state, setState) => {
  let { name, value } = e.target;
  setState({ ...state, [name]: value });
};
