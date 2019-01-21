/**
 *
 * @author Fed Akax
 * @version 1.0.0
 */

/**
 * Gloabal context
 * Use 'Context.setBean' to set any object.
 * Use 'Context.getBean' to get any object.
 */

 // Define the singleton and the enforcer.
let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class Context {
    /**
     * Private constructor for create singleton.
     * Use 'Context.instance' to get the singleton instance.
     */
    constructor(enforcer) {
        if (enforcer != singletonEnforcer) {
            let msg = '[constructor] Cannot instantiate singleton with constructor.';
            console.warn(msg);
            throw new Error(msg);
        }
    }

    /**
     * Get the singleton instance of the document manager.
     *
     * @returns { Context } the singleton instance.
     */
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new Context(singletonEnforcer);
        }
        return this[singleton];
    }

    setBean(key, value) {
        Context.beans.set(key, value);
    }

    getBean(key) {
        return Context.beans.get(key);
    }
}
Context.beans = new Map();
