class erezPromise {

    constructor(_myFunc = false, _resolveVal = false, _rejectVal = false) {
        if (_myFunc) {

            this.myFunc = _myFunc;
            this.resolveVal = _resolveVal;
            this.rejectVal = _rejectVal;

            var result = _myFunc();
            this.call_status = result.type;

            this.result_value = this;

        }
        this.myObj = this;

    }

    call_status;

    myFunc;
    resolveVal;
    rejectVal;
    result_value;
    myObj;

    resolve() {

        if (this.call_status == 'reject') {
            this.reject();
            return this.myObj;
        } else {
            document.dispatchEvent(new Event("RESOLVED"));

            this.result_value = this.resolveVal;
            return this.myObj;
        }
    }






    reject() {
        this.call_status = 'reject';
        document.dispatchEvent(new Event("REJECTED"));
        this.result_value = this.rejectVal;
        return this.myObj;
    }



    erezThen(_myFunction) {

        if (this.call_status == 'resolve') {
            _myFunction();
        }
        return this.myObj;
    }


    erezCatch(_myFunction) {
        if (this.call_status == 'reject') {
            _myFunction();
        }
        return this.myObj;
    }

    erezAll(_myPromisesArray) {

        const result_arr = [];
        let hasReject = false;
        for (var i = 0; i < _myPromisesArray.length; i++) {

            var myPromise = _myPromisesArray[i];
            var result = myPromise.resolve();

            switch (result.call_status) {
                case 'resolve':
                    result_arr.push(result.result_value);
                    break;
                case 'reject':
                    hasReject = true;
                    break;
            }
        }
        if (hasReject) {
            this.call_status = 'reject';
            this.rejectVal = 'Promise All Error';
            this.result_value = this.rejectVal;
        } else {
            this.call_status = 'resolve';
            this.resolveVal = result_arr;
            this.result_value = result_arr;

        }

        return this.myObj;
    }

}

/// EXAMPLE

function sayHi(name) {

    var myFunc = () => {

        var error = false; // set between true or false 
        if (error) return ({ value: "I Have error", type: 'reject' });
        else {
            console.log('Hi ' + name);
            return ({ value: "OK", type: 'resolve' });
        }

    }
    return new erezPromise(myFunc, "OK", "I Have error");



}

var onCatch = () => { console.log('GETOUT!!') };

var onCatch2 = () => { console.log('I SAID GETOUT!!') }

var onThen = () => { console.log('Bye') };

var onThen2 = () => { console.log('Amigo') }

var onThen3 = () => { console.log('See You!') }



// EXAMPLE 1:
var erez_promise = sayHi('Erez').resolve().erezThen(onThen).result_value;


//EXAMPLE 2: 
// var erez_promise = sayHi('Erez').resolve().erezThen(onThen).erezThen(onThen2).erezCatch(onCatch).result_value;


// PROMISE ALL EXAMPLE:
// const testPromiseAll = [sayHi('Erez'), sayHi('Avi')];
// let erez_promise = new erezPromise().erezAll(testPromiseAll).erezThen(onThen3).result_value;





// AWAIT IMPLEMENTATION
function erezAwait(_myPromise) {

    var awaiting = true;
    var timeoutCounter = 0;
    document.addEventListener("RESOLVED", function() {
        console.log('RESOLVED');
        awaiting = false
    });


    while (awaiting == true && timeoutCounter < 4000) {
        console.log("waiting....");
        timeoutCounter++;
    }
    var my_promise = _myPromise.resolve();

    return my_promise.result_value;;
}


// var erez_promise = erezAwait(sayHi('Erez'));


console.log('erez_promise: ' + erez_promise);