const palindrome = require("../utils/for_testing").palindrome;

test("palindrome of guru", () => {
  expect(palindrome("guru")).toBe("urug");
});

test("palindrome of tha", () => {
  expect(palindrome("tha")).toBe("aht");
});

test("palindrome of releveler", () => {
  const result = palindrome("releveler");

  expect(result).toBe("releveler");
});
