var Papa = require('./papaparse.min.js');
var fs = require('fs');

handle("./docs/TEST.csv", "AgencyCode");

function handle(fileInput, col) {
    
    fs.readFile(fileInput, 'utf8', function(err, data) {
        parse(data, col);
    });

}

function parse(data, col) {
    Papa.parse(data, {
        header: true,
        dynamicTyping: true,
        complete: function (res) {
            var toWrite = removeDuplicate(res.data, col);
            console.log(Papa.unparse(toWrite));
            fs.writeFile("test.csv", Papa.unparse(toWrite), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
            // var blob = new Blob([Papa.unparse(toWrite)], { type: "text/plain;charset=utf-8" });
            // invokeSaveAsDialog(blob, 'text.csv');
        }
    });
}

function removeDuplicate(data, col) {
    var filteredWorkSheet = {};
    return data.filter(function (d, i) {
        console.log(i, d);
        var key = d[col];
        if (filteredWorkSheet[key] === undefined || key < 0 || key === 99999) {
            filteredWorkSheet[key] = 1;
            return true;
        }
        return false;
    });
}

function invokeSaveAsDialog(file, fileName) {
    if (!file) {
        throw 'Blob object is required.';
    }

    if (!file.type) {
        file.type = 'video/webm';
    }

    var fileExtension = file.type.split('/')[1];

    if (fileName && fileName.indexOf('.') !== -1) {
        var splitted = fileName.split('.');
        fileName = splitted[0];
        fileExtension = splitted[1];
    }

    var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

    if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(file, fileFullName);
    } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(file, fileFullName);
    }

    var hyperlink = document.createElement('a');
    hyperlink.href = URL.createObjectURL(file);
    hyperlink.target = '_blank';
    hyperlink.download = fileFullName;

    if (!!navigator.mozGetUserMedia) {
        hyperlink.onclick = function () {
            (document.body || document.documentElement).removeChild(hyperlink);
        };
        (document.body || document.documentElement).appendChild(hyperlink);
    }

    var evt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    hyperlink.dispatchEvent(evt);

    if (!navigator.mozGetUserMedia) {
        URL.revokeObjectURL(hyperlink.href);
    }
}