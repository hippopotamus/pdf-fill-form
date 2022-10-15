import debug from './build/Debug/pdf_fill_form'
import release from './build/Release/pdf_fill_form'
import base from './build/default/pdf_fill_form'

(function () {
    "use strict";

    var makePromises = function(myLib) {

        // Read promise (sync)
        myLib.read = function(fileName) {
            return new Promise(function(resolve, reject) {
                try {
                    var myFile = myLib.readSync(fileName);
                    resolve(myFile);
                }
                catch(error) {
                    reject(error);
                }
            });
        }

        // ReadBuffer promise (sync)
        myLib.readBuffer = function(fileBuffer) {
            return new Promise(function(resolve, reject) {
                try {
                    var myFile = myLib.readBufferSync(fileBuffer);
                    resolve(myFile);
                }
                catch(error) {
                    reject(error);
                }
            });
        }

        // WriteBuffer promise (sync)
        myLib.writeBuffer = function(fileBuffer, fields, params) {
            return new Promise(function(resolve, reject) {
                try {
                    var myFile = myLib.writeBufferSync(fileBuffer, fields, params);
                    resolve(myFile);
                }
                catch(error) {
                    reject(error);
                }
            });
        }

        // Write promise (async)
        myLib.write = function(fileName, fields, params) {
            return new Promise(function(resolve, reject) {
                try {
                    myLib.writeAsync(fileName, fields, params, function(err, result) {
                        if(err) { reject(err); }
                        else {
                            resolve(result);
                        }
                    });
                }
                catch(error) {
                    reject(error);
                }
            });
        }


        return myLib;
    }

    try {
        try {
            module.exports = makePromises(debug);
        } catch (e) {
            module.exports = makePromises(release);
        }
    } catch (e) {
        console.log(e);
        module.exports = makePromises(base);
    }
})();
