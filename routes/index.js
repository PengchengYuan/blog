var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;
function rumCommand(cmd, args, callback) {
  var child = spawn(cmd, args)
  var response = ''
  child.stdout.on('data', function (buffer) {
    response += buffer.toString()
  })
  child.stdout.on('end', function () {
    callback(response)
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/pushCode', function(req, res, next) {
  console.log('请求参数：', req.body);
  if(/* 验证请求是来自GitHub的逻辑 */) {
    rumCommand('sh', ['./deployed.sh'], function (txt) {
      console.log(txt)
    })
  }else{

  }
});

module.exports = router;
