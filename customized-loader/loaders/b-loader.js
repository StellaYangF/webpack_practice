const loader = function(inputSource) {
    console.loh('b-loader');
    return inputSource + "// b-loader";
}

loader.pitch = function(remainingRequest, previousRequest, data) {
    data.pitch = "b-loader.pitch";
}

module.exports = loader;