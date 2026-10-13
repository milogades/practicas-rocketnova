// isFinite()
var web = "https://universae.com/";
var webEncoded = encodeURIComponent(web);
console.log(webEncoded); // https%3A%2F%2Funiversae.com%2F

var webDecoded = decodeURIComponent(webEncoded);
console.log(webDecoded); // https://universae.com/