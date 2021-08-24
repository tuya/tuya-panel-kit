export const checkIsColor = (bgVal: string): boolean => {
  const isHex6Color = /^#[0-9A-F]{6}$/i;
  const isHex3Color = /^#[0-9A-F]{3}$/i;
  const isRgb = /^rgb/;
  const isRgba = /^rgba/;
  return (
    isHex6Color.test(bgVal) || isHex3Color.test(bgVal) || isRgb.test(bgVal) || isRgba.test(bgVal)
  );
};

const width = 375;
const height = 667;
const getY = (k: number, x: number) => k * (x - width / 2) + height / 2;
const getX = (k: number, y: number) => (y - height / 2) / k + width / 2;
export const getCoords = (deg: number): any => {
  const rad = (deg * Math.PI) / 180;
  let x1;
  let y1;
  let x2;
  let y2;
  const k1 = height / width;
  const k2 = -k1;
  const k = Math.tan(rad);
  if (deg === 0) {
    x1 = 0;
    y1 = 0;
    x2 = width;
    y2 = 0;
  } else if (deg < 90) {
    y1 = 0;
    x1 = getX(k, y1);
    y2 = height;
    x2 = getX(k, y2);
    if (k < k1) {
      x1 = 0;
      y1 = getY(k, x1);
      x2 = width;
      y2 = getY(k, x2);
    }
  } else if (deg === 90) {
    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = height;
  } else if (deg < 180) {
    y1 = 0;
    x1 = getX(k, y1);
    y2 = height;
    x2 = getX(k, y2);
    if (k > k2) {
      x1 = width;
      y1 = getY(k, x1);
      x2 = 0;
      y2 = getY(k, x2);
    }
  } else if (deg === 180) {
    x1 = width;
    y1 = 0;
    x2 = 0;
    y2 = 0;
  } else if (deg < 270) {
    x1 = width;
    y1 = getY(k, x1);
    x2 = 0;
    y2 = getY(k, x2);
    if (k > k1) {
      y1 = height;
      x1 = getX(k, y1);
      y2 = 0;
      x2 = getX(k, y2);
    }
  } else if (deg === 270) {
    x1 = 0;
    y1 = height;
    x2 = 0;
    y2 = 0;
  } else {
    x1 = 0;
    y1 = getY(k, x1);
    x2 = width;
    y2 = getY(k, x2);
    if (k < k2) {
      y1 = height;
      x1 = getX(k, y1);
      y2 = 0;
      x2 = getX(k, y2);
    }
  }
  return {
    x1: `${(x1 / width) * 100}%`,
    y1: `${(y1 / height) * 100}%`,
    x2: `${(x2 / width) * 100}%`,
    y2: `${(y2 / height) * 100}%`,
  };
};
