/*
 * @Author: kricsleo
 * @Date: 2018-10-11 16:27:08
 * @LastEditors: kricsleo
 * @LastEditTime: 2018-10-12 17:09:56
 * @Description: cookie 操作工具
 */

const Cookie = {
  /**
   * 设置cookie
   *
   * @param {string} key cookie键名
   * @param {string} value cookie值
   * @param {object} cookie相关设置
   *  domain {string} cookie域名, 默认当前页面域名
   *  path {string} cookie可访问范围, 默认当前页面域名下所有页面
   *  expireDays {string} cookie有效天数, 默认1000天后过期
   * @returns
   */
  setCookie(key, value, options = {
    domain: window.location.hostname,
    path: '/',
    expireDays: 1000,
  }) {
    const { domain = window.location.hostname, path = '/', expireDays = 1000 } = options;

    let expireDateStr = '';
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + expireDays)
    expireDateStr = ' ;expires=' + expireDate.toGMTString();
    let keyStr = encodeURIComponent(key).trim() + '=' + encodeURIComponent(value).trim();
    let cookieStr = `${keyStr}${expireDateStr} ;domain=${domain} ;path=${path}`

    document.cookie = cookieStr;
  },

  /**
   * 获取cookie
   *
   * @param {string} key cookie键名
   * @returns cookie键值
   */
  getCookie(key) {
    const cookieStr = document.cookie;
    if (!cookieStr) {
      return ''
    }
    const pattern = new RegExp(`${encodeURIComponent(key)}=(([0-9a-zA-Z]*);?)`);
    const match = cookieStr.match(pattern);
    if (!match) {
      return '';
    } else {
      return match[2];
    }
  },

  /**
   * 移除cookie
   *
   * @param {string} key cookie键名
   * @returns
   */
  removeCookie(key) {
    const cookieStr = document.cookie;
    if (!cookieStr.includes(`${encodeURIComponent(key)}=`)) {
      return;
    }
    this.setCookie(key, '', {
      expireDays: -1,
    });
  }
}

export default Cookie;

