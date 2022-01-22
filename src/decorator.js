const { eventOrder } = require('./constants');

class Decorator {
    static #decorate = ({ fn, when }, oldfn) => async (...args) => {
        const [first, second] = when === eventOrder.afterOriginalCall ? 
        [oldfn, fn] : [fn, oldfn];

        const result = await first.apply(this, args);
        const defaultFormat = Array.isArray(result) ? result: [result];

        return second.apply(this, defaultFormat);
    }

    static decorateModule(overridenMethods, target) {
        const moduleClone = Object.assign({}, target);
        const finalFunctions = new Map();

        for(const [key, value] of overridenMethods) {
            const oldFn = Reflect.get(moduleClone, key);
            finalFunctions.set(key, this.#decorate(value, oldFn));
        }

        const newFunctions = Object.fromEntries(finalFunctions);
        Object.assign(target, newFunctions);
    }
}

module.exports = { Decorator };