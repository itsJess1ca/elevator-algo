import { difference } from "./utils";

describe('difference', () => {
  it('should return the correct difference', () => {
    expect(difference(2, 3)).toEqual(1);
    expect(difference(0, 5)).toEqual(5);
    expect(difference(5, 0)).toEqual(5);
    expect(difference(3, 2)).toEqual(1);
  })
})