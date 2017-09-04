import Axios from 'axios';

/** Scan the /api directory and find all API files modules */
const apiModules = require.context('../api/', false, /.api.js$/);

/**
 * Vue application api plugin.
 * Attach a api accessor to Vue.
 * @module Vue/$api
 * @param {object} Vue - The Vue application object
 * @param {object} config - The json object configuration
 */
export default (Vue, config) => {
  const $Vue = Vue;
  /** Get all API modules path */
  const apiModulesPath = apiModules.keys();
  /** Instances API container for Singleton */
  const instancesApi = {};

  /** Set global comportement to Axios */
  if ('defaults' in config) {
    Object.assign(Axios.defaults, config.defaults);
  }

  const api = {
    $api: {
      enumerable: true,
      value: Object.create({}, {
        /**
         * Get an API instance from his name.
         * Thanks to configuration and a specific API file.
         *
         * @param {string} name - The name of an API.
         * @return {object} The instance of an API.
         */
        get: {
          value: (name) => {
            /** Return the desired api instance if already exists */
            if (name in instancesApi) {
              return instancesApi[name];
            }

            const fileName = `./${name}.api.js`;

            /** Throw an error if API file module doen't exists */
            if (apiModulesPath.indexOf(fileName) === -1) {
              throw new Error(`${name}.api.js file doesn't exists`);
            }

            /** Throw an error if API don't have any configuration */
            if (!(name in config)) {
              throw new Error(`No declared configuration for ${name} API`);
            }

            /** Load the API module */
            const Module = apiModules(fileName).default;
            /** Instanciate the API with the right configuration */
            const instanceApi = new Module(config[name]);

            instancesApi[name] = instanceApi;

            return instanceApi;
          },
        },
      }),
    },
  };

  /** Attach the api to Vue as property. */
  Object.defineProperties($Vue, api);
  /** 
   * Plus, attach the api to the prototype of Vue.
   * So every components could access to the api.
   */
  Object.defineProperties($Vue.prototype, api);
};
