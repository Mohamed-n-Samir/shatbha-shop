// write a code that generates a random 16 hex char

const randomGen = () => {
    let random = Math.random().toString(16).substr(2, 16);
    return random;
}

module.exports = randomGen;