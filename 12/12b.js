const add = function () {
    console.log(2 + 3);
};

function runTwice(func) {
    func();
    func();
}

runTwice(function(){console.log('12b');})
runTwice(add);