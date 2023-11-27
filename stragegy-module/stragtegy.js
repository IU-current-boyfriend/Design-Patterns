const regExpPhoneNumber = /^1[3|5|8]\d{9}$/g;
export const CHECKUSERFORMMAP = {
  IsNotEmpty: function (val, errMsg) {
    return val === '' ? errMsg : val;
  },
  MinLength: function (val, len, errMsg) {
    var valLen = val.length;
    return valLen < len ? errMsg : val;
  },
  PhoneFormate: function (val, errMsg) {
    return regExpPhoneNumber.test(val) ? val : errMsg;
  },
  // 测试扩展
  ExternalIsNotEmpty: function (val, errMsg) {
    return val === '' ? errMsg : val;
  },
}
