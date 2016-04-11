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
    var transportMode = request.params.transport_mode
    var fromRegion = request.param.from_region
    var toRegion = request.param.to_region

    var fromStr = from[0] + ',' + from[1]
    var toStr = to[0] + ',' + to [1]


    var urlTemplate = "http://api.map.baidu.com/direction/v1" +
        "?mode=$transport_mode$" +
        "&origin=$origin$" +
        "&destination=$destination$" +
        "&origin_region=$from_region$" +
        "&destination_region=$to_region$" +
        "&output=json" +
        "&ak=o0RuzQRVNo1YuIorz50uWVLs6DXVSo7X";

    urlTemplate = urlTemplate.replace('$transport_mode$', transportMode)
    urlTemplate = urlTemplate.replace('$origin$', fromStr)
    urlTemplate = urlTemplate.replace('$destination$', toStr)
    urlTemplate = urlTemplate.replace('$from_region$', fromRegion)
    urlTemplate = urlTemplate.replace('$to_region$', toRegion)

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
    var transportMode = request.params.transport_mode
    var fromRegion = request.params.from_region
    var toRegion = request.params.to_region

    var urlTemplate = "http://api.map.baidu.com/direction/v1" +
        "?mode=$transport_mode$" +
        "&origin=$origin$" +
        "&destination=$destination$" +
        "&origin_region=$from_region$" +
        "&destination_region=$to_region$" +
        "&output=json" +
        "&ak=o0RuzQRVNo1YuIorz50uWVLs6DXVSo7X";

    urlTemplate = urlTemplate.replace('$transport_mode$', transportMode)
    urlTemplate = urlTemplate.replace('$origin$', from)
    urlTemplate = urlTemplate.replace('$destination$', to)
    urlTemplate = urlTemplate.replace('$from_region$', fromRegion)
    urlTemplate = urlTemplate.replace('$to_region$', toRegion)

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
