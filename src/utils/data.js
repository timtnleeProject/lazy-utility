export const combineTemplateString = (...args) => {
  const [strs, ...exp] = args;
  let str = '';
  for (let i = 0; i < strs.length; i++) {
    if (exp[i]) {
      str += strs[i] + exp[i];
    } else if (i === strs.length - 1) {
      str += strs[i];
    }
  }
  return str;
};
