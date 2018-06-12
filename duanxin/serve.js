var request = require('request');  
var sha1=require('sha1');  
var qs = require('querystring');  
var Appkey='337d18306667f2b9c055efc358dc0349';  
let now=Date.now();  
let CurTime=parseInt(now/1000)+""; //当前时间秒数  
var Nonce=sha1(CurTime);  //随机数  
var AppSecret='690a2c4d8abb';  
var str=AppSecret + Nonce + CurTime;  
var CheckSum=sha1(str);  
var post_data = {  
    mobile:"15732176589",  
    authCode:6666
};//这是需要提交的数据  
  
  
var options = {  
    url: 'https://api.netease.im/sms/sendcode.action', //拼接也是在body 不拼接就写body:"", 封装好的  
    method: 'POST',  
    json: true,
    headers: {  
        'AppKey': Appkey,  
        'Nonce': Nonce,  
        'CurTime': CurTime,  
        'CheckSum': CheckSum,  
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    } ,
    body:qs.stringify(post_data)
};  
  
  
function callback(error, response, body) {  
    console.log(response);  
}  
  
request(options, callback);  