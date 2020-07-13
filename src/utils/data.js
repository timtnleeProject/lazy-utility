export const combineTemplateString = (...args) => {
  const [strs, ...exp] = args;
  let str = '';
  let first = true;
  for (let i = 0; i < strs.length; i++) {
    if (exp[i]) {
      if (first) {
        str += exp[i];
        first = false;
      } else {
        str += strs[i] + exp[i];
      };
    } else if (i === strs.length - 1) {
      str += strs[i];
    }
  }
  return str;
};
