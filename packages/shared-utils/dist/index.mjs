const e = (t) => t.toISOString().split("T")[0], n = () => Math.random().toString(36).substring(2, 9), s = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
export {
  e as formatDate,
  n as generateId,
  s as validateEmail
};
