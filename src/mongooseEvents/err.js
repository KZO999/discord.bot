module.exports = {
    name: "err",
    async execute(error) {
        console.log('Ha habido un error:\n' + error);
    },
};