/**
 * 
 * 策略模式：=> 核心还是很简单的
 * 
 */
import { Validate } from "./Validate.js";
((function () {
  // 获取表单
  var userForm = document.getElementById('userForm');

  const validate = new Validate();

  // 校验的配置，相当于elementui里面的rules
  const rules = [
    {
      // 需要校验的元素
      J_userName: {
        stragtegy: ['IsNotEmpty', 'MinLength:6', 'ExternalIsNotEmpty'],
        errMsg: {
          IsNotEmpty: '用户名不能为空!!!',
          MinLength: '用户名长度不能小于6位!!!',
          ExternalIsNotEmpty: '测试后期扩展用的'
        }
      }
    },
    {
      // 需要校验的元素
      J_passWord: {
        stragtegy: ['IsNotEmpty', 'MinLength:6'],
        errMsg: {
          IsNotEmpty: '用户密码不能为空',
          MinLength: '密码长度不能小于6位!!!'
        }
      }
    },
    {
      // 需要校验的元素
      J_phoneNumber: {
        stragtegy: ['PhoneFormate', 'ExternalIsNotEmpty'],
        errMsg: {
          PhoneFormate: '手机号码格式验证失败!!!',
          ExternalIsNotEmpty: '测试后期扩展用的'
        }
      }
    }
  ];

  validate.add(rules);

  function checkUserFormLogin(e) {
    e.preventDefault();
    // 我想要的结果？ => {J_userName: ['val', '用户名不能为空'], J_passWord: ['用户密码不能长度不能小于6位'], J_phoneNumber: ['用户电话长度不能小于6位']}
    const result = validate.start();
    console.log('result: =>', result);
  }

  // submit事件只会作用于表单元素
  userForm.addEventListener('submit', checkUserFormLogin, false);

}))();