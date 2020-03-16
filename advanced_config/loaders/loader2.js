module.exports = inputSource => {
    console.log('loader2');
    return inputSource + '// loader2';
}