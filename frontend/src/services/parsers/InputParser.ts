function stripName(name: string): string {
  return name
    .replace(/( ) +/g, "$1")
    .substring(0, 30)
    .trim();
}

function parseQuantity(_quantity: string) {
  _quantity = _quantity.replace(/[^0-9]/g, "");
  const quantity = parseInt(_quantity);
  return quantity > 0 ? quantity : 0;
}

export const InputParser = {
  stripName,
  parseQuantity
};
