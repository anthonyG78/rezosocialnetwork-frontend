import Axios from 'axios';

/** 
 * Base class for any api client we need to interact with, 
 * providing unified config loader and request management 
 */
export default class AbstractApi {
  /**
   * Create an Axios instance container.
   * Instanciate an Axios instance from configuration,
   * @param {object} config - The API configuration.
   */
  constructor(config) {
    this.config = config;
    this.http = Axios.create(config);
  }
}
