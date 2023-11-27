import { isExistLenStrargegy, isExistSeparator } from "./utils.js";
import { CHECKUSERFORMMAP } from './stragtegy.js';

export default class CreateStragtegyDataFactory {
  constructor({
    rules
  }) {
    this.rules = rules;
    this.policyRules = Object.create({});
    this.init();
  }

  init() {
    this.createStragtegyData();
  }


  createStragtegyData() {
    const keys = Object.keys(this.rules);
    this.policyRules = keys.reduce((prev, key) => {
      const stragtegyFns = this.createStragtegyFns(key); // [ fn, fn ]
      prev[key] = stragtegyFns;
      return prev;
    }, {});
  }

  createStragtegyFns(key) {
    // 获取对应策略的匹配规则
    const [stragtegyKey, stragtegyRules, errMsg] = this.getStragtegyOptions(key);
    return this.setStragtegyFns({
      stragtegyKey,
      stragtegyRules,
      errMsg
    });
  }


  createCheckLenRulesFn(stragtegyRules) {
    return this.createRulesFn(stragtegyRules);
  }

  createNoCheckLenRulesFn(stragtegyRules) {
    // J_phoneNumber ['PhoneFormate'] { PhoneFormate: '手机号码格式验证失败！！！'}
    return this.createRulesFn(stragtegyRules);
  }

  createRulesFn(stragtegyRules) {
    return stragtegyRules.reduce((prev, key) => {
      let keyName = '';
      const [stragtegyName, len] = isExistSeparator(key);
      len === undefined ? (keyName = key) : (keyName = stragtegyName);
      CHECKUSERFORMMAP[keyName] && prev.push((...args) => {
        return CHECKUSERFORMMAP[keyName].apply(this, args);
      });
      return prev;
    }, []);
  }

  getStragtegyOptions(key) {
    let stragtegy = null;
    let errMsg = null;
    // 感觉?.没有必要，因为肯定存在
    stragtegy = this.rules[key]?.stragtegy;
    errMsg = this.rules[key]?.errMsg;
    return [
      key,
      stragtegy,
      errMsg,
    ]
  }

  setStragtegyFns({
    stragtegyKey,
    stragtegyRules,
    errMsg
  }) {
    const createFnsObj = {
      'noLen': this.createNoCheckLenRulesFn.bind(this, stragtegyRules),
      'len': this.createCheckLenRulesFn.bind(this, stragtegyRules)
    }
    const isExistCheckLenRules = isExistLenStrargegy(stragtegyRules);

    return createFnsObj[isExistCheckLenRules] && createFnsObj[isExistCheckLenRules]();
  }
}