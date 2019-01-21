/**
 *
 */

const exported = process.env.NODE_ENV === 'production' ?
                 require('./configureStore.prod.js').default :
                 require('./configureStore.dev.js').default;

export default exported;
