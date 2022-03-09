class erezPromise {

    constructor(_myFunc) {

        var result = _myFunc();
        // this._this = _myFunc;

        this._call_status = result.type;
        switch (this._call_status) {
            case 'resolve':
                this.resolve(result.value);
                break;
            case 'reject':
                this.reject(result.value);
                break;
        }

    }

    _call_status;


    resolve(_myValue) {
        document.dispatchEvent(new Event("RESOLVED"));
        return _myValue;
    }


    reject(_myValue) {
        return _myValue;
    }



    erezThen(_myFunction) {
        if (this._call_status == 'resolve') {

            _myFunction();
        }
        return this;
    }


    erezCatch(_myFunction) {
        if (this._call_status == 'reject') {
            _myFunction();
        }
        this._catchFunc = _myFunction;
    }

}

/// EXAMPLE

function sayHi(name) {
    setTimeout(() => {
        var myFunc = () => {
            var error = false; // set between true or false 
            if (error) return ({ value: "I Have error", type: 'reject' });
            else {
                console.log('Hi ' + name);
                return ({ value: "OK", type: 'resolve' });
            }
        }
        return new erezPromise(myFunc);
    }, 2000);
}

var onCatch = () => { console.log('GETOUT!!') };

var onCatch2 = () => { console.log('I SAID GETOUT!!') }

var onThen = () => { console.log('Bye') };

var onThen2 = () => { console.log('Amigo') }

var onThen2 = () => { console.log('See You!') }

// sayHi('Erez').erezThen(onThen).erezThen(onThen2).erezCatch(onCatch);


function erezAwait(_myPromise) {
    var awaiting = true;
    document.addEventListener("RESOLVED", function() { awaiting = false });

    /*
        while (awaiting == true) {
            console.log("waiting....")
        }
    */

}


erezAwait(sayHi('Erez'));