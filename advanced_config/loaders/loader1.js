module.exports = function (inputSource) {
    console.log('loader1');
    // sync
    // return inputSource + '// loader1';

    // async
    const callback = this.async();
    setTimeout(() => {
        callback(null, inputSource + '// loader1', "xxx")
    }, 3000);
}