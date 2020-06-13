function isValidName(name: string): boolean {
  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    name.trim().length <= 30
  );
}

function isValidQuantity(quantity: number): boolean {
  return (
    typeof quantity === "number" &&
    Number.isInteger(quantity) &&
    quantity > 0 &&
    quantity < 999
  );
}

export const Validator = {
  isValidName,
  isValidQuantity
};
