var AV = require('leanengine');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function (request, response) {
    response.success('Hello world!');
});


AV.Cloud.define('baiduDistanceCoors', function (request, response) {
    var from = request.params.from
    var to = request.params.to

    var fromStr = from[0] + ',' + from[1]
    var toStr = to[0] + ',' + to [1]


    var urlTemplate = "http://api.map.baidu.com/direction/v1?mode=riding" +
        "&origin=$origin$" +
        "&destination=$destination$" +
        "&origin_region=北京" +
        "&destination_region=北京" +
        "&output=json" +
        "&ak=o0RuzQRVNo1YuIorz50uWVLs6DXVSo7X";

    urlTemplate = urlTemplate.replace('$origin$', fromStr)
    urlTemplate = urlTemplate.replace('$destination$', toStr)
    urlTemplate = encodeURI(urlTemplate)

    console.log('urlTemplate:', urlTemplate)

    AV.Cloud.httpRequest({
        url: urlTemplate,
        success: function (httpResponse) {

            var raw = httpResponse.text
            var rawj = JSON.parse(raw)

            console.log('rawj:', rawj)

            response.success(rawj)

        },
        error: function (httpResponse) {
            console.error(httpResponse)
            console.error(httpResponse.toString())
            console.error('Request failed with response code ' + httpResponse.status);
            response.error()
        }
    })
})

AV.Cloud.define('baiduDistanceString', function (request, response) {
    var from = request.params.from
    var to = request.params.to

    var urlTemplate = "http://api.map.baidu.com/direction/v1?mode=riding" +
        "&origin=$origin$" +
        "&destination=$destination$" +
            //"origin_region=%E5%8C%97%E4%BA%AC" +
        "&origin_region=北京" +
            //"&destination_region=%E5%8C%97%E4%BA%AC" +
        "&destination_region=北京" +
        "&output=json" +
        "&ak=o0RuzQRVNo1YuIorz50uWVLs6DXVSo7X";

    urlTemplate = urlTemplate.replace('$origin$', from)
    urlTemplate = urlTemplate.replace('$destination$', to)
    urlTemplate = encodeURI(urlTemplate)

    console.log('urlTemplate:', urlTemplate)

    AV.Cloud.httpRequest({
        url: urlTemplate,
        success: function (httpResponse) {

            var raw = httpResponse.text
            var rawj = JSON.parse(raw)

            console.log('rawj:', rawj)

            response.success(rawj)

        },
        error: function (httpResponse) {
            console.error(httpResponse)
            console.error(httpResponse.toString())
            console.error('Request failed with response code ' + httpResponse.status);
            response.error()
        }
    })


})

module.exports = AV.Cloud;