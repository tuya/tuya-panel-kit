export function splitArr<T = any>(
  data: Array<T>,
  rowMaxCount: number,
  pageMaxCount: number
): Array<Array<Array<T>>> {
  const ret = [];
  const pages = Math.ceil(data.length / pageMaxCount);
  let index = 0;
  for (let pageIndex = 0; pageIndex < pages && index < data.length; pageIndex++) {
    const pageData = data.slice(index, index + pageMaxCount);
    // 一页应该有多少行
    const rowCount = Math.ceil(pageData.length / rowMaxCount);
    let rowIndex = 0;
    const arr = [];
    for (let j = 0; j < rowCount; j++) {
      const rowData = pageData.slice(rowIndex, rowIndex + rowMaxCount);
      while (rowData.length < rowMaxCount) {
        // eslint-disable-next-line
        // @ts-ignore
        rowData.push(null);
      }
      arr.push(rowData);
      rowIndex += rowMaxCount;
    }
    ret.push(arr);
    index += pageMaxCount;
  }
  return ret;
}
