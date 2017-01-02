var scrId = 0;

var addZerosToNumber = function(currId) {
    var retVal = '';

    if (currId < 1000) {
        retVal += '0';
    }

    if (currId < 100) {
        retVal += '0'; 
    }

    if (currId < 10) { 
        retVal += '0'; 
    }

    return (retVal + currId);
};

exports.InitializeCustomFunctions = function() {
    casper.myCapture = function myCapture(name, isError) {
        isError = (typeof isError !== 'undefined') ? isError : false;
        var basePath = 'screenshots/';
        var ext = '.png';

        if (isError) {
            basePath += 'errors/';
        } else {
            basePath += 'pages/' + (addZerosToNumber(++scrId) + '_');
        }

        var picName = basePath + name + ext;

        casper.capture(picName);
    };
};
