import {  splitArr } from '../utils';

const data1 = [1, 2, 3, 4, 5, 6, 7, 8];
describe('splitArr', () => {
  it('split row 4 page 8', () => {
    const ret = splitArr(data1, 4, 8);
    const target = [
      [[1,2,3,4], [5,6,7,8]],
    ]
    expect(ret).toEqual(target)
  });

  it('split row 4 page 4', () => {
    const ret = splitArr(data1, 4, 4);
    const target = [
      [[1,2,3,4]],
      [[5,6,7,8]]
    ]
  })

  it('split row 3 page 4', () => {
    const ret = splitArr(data1, 3, 4);
    const target = [
      [[1,2,3], [4, null, null]],
      [[5,6,7], [8, null, null]]
    ]
    expect(ret).toEqual(target);
  })

  it('split row 4 page 8 in 15 length', () => {
    const data = new Array(15).fill(0).map((_, idx) => idx + 1);
    const ret = splitArr(data, 4, 8);
    const target = [
      [[1, 2, 3, 4], [5, 6, 7, 8]],
      [[9, 10, 11, 12], [13, 14, 15, null]]
    ]
    expect(ret).toEqual(target);
  })
});