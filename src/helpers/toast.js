const emitToast = (type, toastmsg, opt) => {
  type(toastmsg, { ...opt });
};

export { emitToast };
