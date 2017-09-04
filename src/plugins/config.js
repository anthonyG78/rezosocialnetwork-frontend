/**
 * Vue application configuration plugin.
 * Attach a config to Vue.
 * @module Vue/$config
 * @param {object} Vue - The Vue application object
 * @param {object} config - The json object configuration
 */
export default (Vue, config) => {
  const V = Vue;

  /** Attach the config to Vue as property. */
  V.$config = config;

  /** 
   * Plus, attach the config to the prototype of Vue.
   * So every components could access to the config.
   */
  Object.defineProperty(V.prototype, '$config', {
    /**
     * Get the configuration json object.
     * @return {object} The json object.
     */
    get() {
      return config;
    },
  });
};
