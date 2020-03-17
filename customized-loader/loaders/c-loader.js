const loader = function(inputSource) {
    console.loh('c-loader');
    return inputSource + "// c-loader";
}

loader.pitch = function(remainingRequest, previousRequest, data) {
    data.pitch = "c-loader.pitch";
}

module.exports = loader;