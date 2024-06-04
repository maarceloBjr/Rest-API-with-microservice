export const decimalTransformer = {
  to(value) {
    return value;
  },
  from(value) {
    if (value === null) return null;

    return parseFloat(value);
  },
};
