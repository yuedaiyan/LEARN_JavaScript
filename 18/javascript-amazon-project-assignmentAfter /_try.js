const obj3 = {
    method() {
        console.log('hello');
        console.log("0",this);

        [1, 2, 3].forEach(() => {
            console.log('1',this);
        });
    },
};

obj3.method()