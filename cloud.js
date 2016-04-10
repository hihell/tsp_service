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
    var commuteType = request.params.commute_type

    var fromStr = from[0] + ',' + from[1]
    var toStr = to[0] + ',' + to [1]


    var urlTemplate = "http://api.map.baidu.com/direction/v1" +
        "?mode=$commute_type$" +
        "&origin=$origin$" +
        "&destination=$destination$" +
        "&origin_region=北京" +
        "&destination_region=北京" +
        "&output=json" +
        "&ak=o0RuzQRVNo1YuIorz50uWVLs6DXVSo7X";

    urlTemplate = urlTemplate.replace('$commute_type$', commuteType)
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

AV.Cloud.define('baiduDistanceAddress', function (request, response) {
    var from = request.params.from
    var to = request.params.to
    var commuteType = request.params.commute_type

    var urlTemplate = "http://api.map.baidu.com/direction/v1" +
        "?mode=$commute_type$" +
        "&origin=$origin$" +
        "&destination=$destination$" +
        "&origin_region=北京" +
        "&destination_region=北京" +
        "&output=json" +
        "&ak=o0RuzQRVNo1YuIorz50uWVLs6DXVSo7X";

    urlTemplate = urlTemplate.replace('$commute_type$', commuteType)
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
