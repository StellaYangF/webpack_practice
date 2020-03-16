module.exports = inputSource => {
    console.log(inputSource);
    console.log('loader1');
    return inputSource + '// loader1';
}