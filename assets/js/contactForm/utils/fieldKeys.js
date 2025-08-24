window.FieldKeys = {
  map: {
    first_name: "firstName",
    last_name: "lastName",
    email: "email",
    message: "message",
  },
  toErrorKey(field) {
    return this.map[field] || field;
  },
};
