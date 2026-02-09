for (let i = 1; i <= 20; i++){
    if (i % 3 === 0 || i % 5 === 0) {
        // 3 or 5
        if (i % 3 === 0 && i % 5 === 0) {
            // both 3 and 5
           console.log('FizzBuzz'); 
            continue;
        }

        if (i % 3 === 0) {
            console.log('Fizz');
            continue;
        }

        if (i % 5 === 0) {
            console.log('Buzz');
            continue;
        }

    } else {
        // not 3 or 5 (over)
        console.log(i);
        continue;
    }
}