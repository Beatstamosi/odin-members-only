const secretPassword = (password: string) => {
  const guess = prompt("Enter secret Password:");

  if (guess === password) return true;

  return false;
};

export default secretPassword;
