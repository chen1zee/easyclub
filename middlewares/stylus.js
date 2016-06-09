/**
 * stylus解析中间件
 * 开发中使用
 */

const stylus = require('stylus');
const fs = require('fs-promise');
const path = require('path');


module.exports = (root, opts) => {
  
  return async (ctx, next) => {
    if (ctx.method === 'GET' || ctx.method === 'HEAD') {
      let urlpath = ctx.path;
      if (urlpath.match(/\.styl$/)) {
        let content;
        try {
          content = await fs.readFile(path.join(root, urlpath), 'utf-8');
        } catch (err) {
          ctx.status = 404;
          ctx.body = 'Connot find ' + ctx.url;
          return;
        }
        let result = require('stylus').render(content);
        ctx.set('Content-Type', 'text/css; charset=UTF-8');
        ctx.body = result;
      } else {
        await next();
      }
    } 
  }
}
