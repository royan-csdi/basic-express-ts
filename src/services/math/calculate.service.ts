export const Scalculate = (
  operation: string,
  numA: number,
  numB: number
): number | null => {
  switch (operation) {
    case "add":
      return numA + numB;
    case "subtract":
      return numA - numB;
    case "multiply":
      return numA * numB;
    case "divide":
      return numB !== 0 ? numA / numB : null;
    default:
      throw new Error("Invalid operation");
  }
};
