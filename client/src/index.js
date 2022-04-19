async function guard(to, from, next) {
    console.log('Guarded');
    next();
};

module.exports = {
    guard
};