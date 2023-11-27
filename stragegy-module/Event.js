export default class Event {
  constructor() {
    // 事件处理的缓存池
    this.cache = {};
    /**
     * {
     *    J_userName: {
     *      minLength: [fn],
     *      isNoEmpty: [fn]
     *    }
     * }
     */
  }

  // 发布订阅的模式，订阅的流程
  /**
   * 
   * @param {*} key 键名 
   * @param {*} fn 需要执行的函数
   */
  subscribeEvent(key, fn, type) {
    if (!this.cache[key]) {
      this.cache[key] = {};
    }
    if (!this.cache[key][type]) {
      this.cache[key][type] = []
    }
    this.cache[key][type].push(fn);

    // console.log('this.cache: =>', this.cache);
  }

  // 发布订阅的模式，发布的流程
  dispatchEvent(key, type, ...args) {
    const executorFn = this.cache[key][type];
    const resultInfo = {};
    resultInfo.type = key;
    // 执行后的结果返回给Validate类
    executorFn && executorFn.forEach(fn => {
      resultInfo.msg = fn.apply(this, args);
    });
    return resultInfo;
  }

}
