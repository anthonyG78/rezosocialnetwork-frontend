import Basil from 'basil.js';

/**
 * Vue application authenticate plugin.
 * Attach a authentication to Vue.
 * @module Vue/$config
 * @param {object} Vue - The Vue application object
 */
export default (Vue) => {
  const V = Vue;
  const api = V.$api.get('rezo');
  const storage = new Basil({
    storages: ['local'],
    storage: 'local',
  });

  /**
   * Class allowing to manage Authentication and User
   */
  class Authenticate {
    static signin(login, password) {
      return api.signin(login, password)
        .then((data) => {
          this.setProfile(data.user);
          return data;
        });
    }

    static signout() {
      return api.signout()
        .then(() => {
          storage.remove('user');
        });
    }

    static isAuthenticated() {
      return storage.get('user') !== null && api.hasToken();
    }

    static getProfile() {
      return storage.get('user');
    }

    static setProfile(user) {
      storage.set('user', user);
    }
  }

  /** Attach the authenticate to Vue as property. */
  V.$auth = Authenticate;

  /** 
   * Plus, attach the authenticate to the prototype of Vue.
   * So every components could access to the authenticate.
   */
  Object.defineProperty(V.prototype, '$auth', {
    /**
     * Get the authenticate class.
     * @return {class} The authenticate class.
     */
    get() {
      return Authenticate;
    },
  });
};
