import Event from './Event.js';
import CreateStragtegyDataFactory from './CreateStragtegyDataFactory.js';
import { getObjectKeys, isExistLenStrargegy, isExistSeparator } from './utils.js';
import { CHECKUSERFORMMAP } from './stragtegy.js';

class Validate extends Event {
  // 1. 遇到的两个问题，拿不到输入后的dom值?如何处理
  // 2. 策略模式最后对应的有问题？最后发布订阅缓存池里面数据格式是什么样子的呢？
  /**
   * 
   * @param {*} rules 
   */
  add(rules) {
    // 挂载规则，如果是重复的话，以最后一次添加为准。
    this.initRules(rules);
    // 初始化验证规则的策略对象
    this.initPocliyRules();
    // Event类方法中的subscribeEvent方法只需要【key， fn】
    // 我想通过一个方法，根据分析rules中的stragtegy返回出一个结构：
    /**
     * {
     *  J_userName: [fn, fn],
     *  J_passWord: [fn, fn],
     *  J_phoneNumber: [fn, fn]
     * }
     * 
     */
    this.createPocliyRules();
    // 发布订阅中的订阅已经完成
    this.startSubscribeEvent();
  }


  /**
   * {
   *  J_userName: [],
   *  J_passWord: [],
   *  J_phoneNumber: [],
   * }
   * @param {*} result 
   * @param {*} key 
   * @param {*} msg 
   */
  createResultInfo(result, key, msg) {
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(msg);
  }

  createPocliyRules() {
    // 转换一下rules规则
    this.transformPocliyRules();
    // stragtegyData的格式对应着上面👆的数据格式
    const { policyRules } = new CreateStragtegyDataFactory({
      rules: this._transformRules
    });

    policyRules && (this._policyRules = policyRules);
  }

  initPocliyRules() {
    // 创建校验规则类型的策略对象
    this._policyRules = Object.create({});
  }

  initRules(rules = []) {
    const rulesLen = rules.length;
    if (!rulesLen) return;
    this._rules = rules;
  }

  start() {
    const keys = Object.keys(this._transformRules);
    const result = [];
    keys.forEach(key => {
      result.push(this.startDispatchEvent(key));
    });
    return result;
  }

  startSubscribeEvent() {
    const keys = Object.keys(this._policyRules);
    if (keys.length > 0) {
      keys.forEach(key => {
        const types = this._transformRules[key].stragtegy.map(type => {
          type = type.replace(/\:(.)/g, '');
          return type;
        });
        const fns = this._policyRules[key];
        fns.forEach((fn, index) => {
          this.subscribeEvent(key, fn, types[index]);
        });
      });
    }
  }

  startDispatchEvent(key) {
    const transformRules = this._transformRules;
    const stragtegys = transformRules[key].stragtegy;
    const oElementVal = document.getElementById(key).value;
    const result = {};
    // 根据不同的策略去
    stragtegys.forEach((stragtegy) => {
      const args = [];
      const [stragtegyName, len] = isExistSeparator(stragtegy);
      const errMsg = transformRules[key].errMsg[stragtegyName];
      len !== undefined ? args.push(oElementVal, len, errMsg) : args.push(oElementVal, errMsg);
      const { type, msg } = this.dispatchEvent(key, stragtegyName, ...args);
      this.createResultInfo(result, key, msg);
    });
    return result;
  }

  transformPocliyRules() {
    this._transformRules = this._rules.reduce((prev, current) => {
      const keys = Object.keys(current);
      keys.forEach(key => {
        prev[key] = current[key];
      })
      return prev;
    }, {});
  }

}
export {
  Validate
};