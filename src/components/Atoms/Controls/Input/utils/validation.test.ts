import { getValidationRules } from "../utils/validation";

describe("getValidationRules — smoke tests", () => {
  it("switch ⇒ required false", () => {
    const rules = getValidationRules("switch", "sw");
    expect(rules.required).toBe(false);
  });

  it("text ⇒ required message", () => {
    const rules = getValidationRules("text", "nm", "Name");
    expect(rules.required).toBe("Name is required");
  });

  it("number ⇒ min rule & valueAsNumber", () => {
    const rules = getValidationRules("number", "age");
    expect(rules.valueAsNumber).toBe(true);
    expect((rules.min as any).value).toBe(0);
  });

  it("password ⇒ validator passes / fails", () => {
    const rules = getValidationRules("password", "pwd");
    const validateFn = rules.validate as (v: string, f: any) => any;

    expect(validateFn("Passw0rd!", {})).toBe(true);
    expect(validateFn("password!", {})).not.toBe(true);
  });

  it("customValidation overrides", () => {
    const custom = { required: "custom req" } as const;
    const rules = getValidationRules("text", "x", "X", true, custom);
    expect(rules).toBe(custom);
  });
});
