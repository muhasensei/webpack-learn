async function start(){
    return await Promise.resolve('This is async function and it works!');
}

start().then(console.log);

const username = 'Mukhit';

class Example{
    static id = 5;
}
import('lodash').then(_ => {
    console.log('Lodash work: ', _);
})
console.log('Static prop: ',Example.id);