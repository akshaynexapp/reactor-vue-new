/*
 * @Description  :
 * @Date         : 2022-06-28 14:53:54
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-06 19:30:00
 */
/**
 * 流量格式化
 * @param val
 * @returns
 */
export function Fflow(val: any) {
  val = val.toString().replace(/\$|\,/g, '');
  if (undefined === val || null == val || '' === val) {
    return '0.000KB';
  }
  const mb = 1024,
    gb = mb * 1024,
    tb = gb * 1024;
  // TB
  if (val > tb) {
    return (val / tb).toFixed(3) + 'TB';
  }
  // GB
  if (val > gb) {
    return (val / gb).toFixed(3) + 'GB';
  }
  // MB
  if (val > mb) {
    return (val / mb).toFixed(3) + 'MB';
  }

  return new Number(val).toFixed(3) + 'KB';
}

/**
 * 打开新窗口
 * @param url 目标地址
 */
export function openNewWindow(url: string) {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.setAttribute('style', 'display: none');
  a.setAttribute('target', '_blank');
  a.setAttribute('href', url);
  a.click();
  document.body.removeChild(a);
}
