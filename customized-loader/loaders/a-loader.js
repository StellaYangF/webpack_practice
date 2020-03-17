const loader = function(inputSource) {
    console.loh('a-loader');
    return inputSource + "// a-loader";
}

loader.pitch = function(remainingRequest, previousRequest, data) {
    data.pitch = "a-loader.pitch";
}

module.exports = loader;