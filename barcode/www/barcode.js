var exec = require('cordova/exec');
var argble = "message"
exports.registerReceiver = function(success, error) { //注册监听的js方法
    exec(success, error, "barcode", "registerReceiver", [argble]);
}
exports.unregisterReceiver = function(success, error) {
    exec(success, error, "barcode", "unregisterReceiver", [argble]); //取消监听的js方法
}
exports.search = function(success, error) {
    exec(success, error, "barcode", "search", [argble]);
}
exports.open = function(arg0, success, error) {
    exec(success, error, 'barcode', 'open', [arg0]);
};
exports.printBarCode = function(arg0, offset, xDpi, hDpi, h, num, success, error) {
    exec(success, error, 'barcode', 'printBarCode', [arg0, offset, xDpi, hDpi, h, num]);
};
exports.close = function(success, error) {
    exec(success, error, 'barcode', 'close');
};