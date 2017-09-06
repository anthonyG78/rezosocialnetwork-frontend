export default (Vue, langs) => {
  const _langs = {
    $langs: {
      value: langs,
    },
  };
  /** Attach the api to Vue as property. */
  Object.defineProperties(Vue, _langs);
  /** 
   * Plus, attach the api to the prototype of Vue.
   * So every components could access to the api.
   */
  Object.defineProperties(Vue.prototype, _langs);
};
