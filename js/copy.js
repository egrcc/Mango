

function gettoken() {

    var deadline=1000
    var ak='your ak';
    var sk='your sk';
    var bucket='you bucket';

    var qiniu = require('qiniu');
    qiniu.conf.ACCESS_KEY = ak;
    qiniu.conf.SECRET_KEY = sk;
    var putPolicy = new qiniu.rs.PutPolicy(bucket);
    putPolicy.expires = Math.round(new Date().getTime() / 1000) + deadline * 3600;
    var qiniutoken = putPolicy.token();
    return qiniutoken
};

function qiniuUpload(f, token, key,fn) {
  var xhr = new XMLHttpRequest();
  var key
  //创建表单
  xhr.open('POST', 'http://up.qiniu.com', true);
  var formData, startDate;
  formData = new FormData();
  formData.append('key', key);
  formData.append('token', token);
  formData.append('file', f);
  formData.append('mimeType', "image/jpeg");


  xhr.onreadystatechange = function (response) {
   
   if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText) {
	var img = '![](http://'+'your host name'+'/' + key + ')'+"\n";
        var oldstring=$("textarea#editor").val();
        $("textarea#editor").val(oldstring+"\n"+img);  

   }else{
      console.log("failed...");
   }
  }

  //提交数据
  xhr.send(formData);
};

function callback(data){
   console.log(data);
};
