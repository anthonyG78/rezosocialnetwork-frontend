import Basil from 'basil.js';
import AbstractApi from '../api/abstract.api';

/**
 * Class allowing to manage Authentication and User
 * @extends AbstractApi
 */
export default class Rezo extends AbstractApi {
  /**
   * Create a Cloud API.
   * @param {object} config - The API configuration.
   */
  constructor(config) {
    super(config);

    this.storage = new Basil({
      storages: ['local'],
      storage: 'local',
    });
    this.http.interceptors.request.use((conf) => {
      const token = this.getToken();
      const $requetConfig = conf;

      /** 
       * If there is no data to send, 
       * No content-type is send and server occure an internal error. 
       * So, allways send at least empty data.
       */
      if (!('data' in $requetConfig)) {
        $requetConfig.data = {};
      }

      if (token) {
        $requetConfig.headers.Authorization = `JWT ${token}`;
        return $requetConfig;
      }

      return conf;
    });
    this.http.interceptors.response.use(response => response.data);
  }

  pingSecure() {
    return this.http({
      url: '/secure/profil/ping',
      method: 'post',
    });
  }

  register(user) {
    return this.http({
      url: '/authenticate/register',
      method: 'post',
      data: user,
    })
      .then((data) => {
        this.setToken(data.token);
        return data;
      });
  }

  /**
   * Authenticate, get Profile informations and save token in storage.
   * @param {string} username - The user username.
   * @param {string} password - The user password.
   * @return {Object} A Promise
   */
  signin(username, password) {
    return this.http({
      url: '/authenticate/login',
      method: 'post',
      data: {
        username,
        password,
      },
    })
      .then((data) => {
        this.setToken(data.token);
        return data;
      });
  }

  /**
   * Sign out and remove token.
   * @return {Object} A Promise
   */
  signout() {
    return this.http({
      url: '/authenticate/logout',
      method: 'post',
    })
      .then(() => {
        this.removeToken();
      });
  }

  /**
   * Update user data.
   * @param {string} userId - The user Id.
   * @param {object} profil - The profil data.
   * @return {Object} A Promise
   */
  updateProfil(userId, profil) {
    return this.http({
      url: `/secure/profil/${userId}`,
      method: 'put',
      data: profil,
    });
  }

  /**
   * Delete a user.
   * @param {string} userId - The user Id.
   * @return {Object} A Promise
   */
  deleteProfil(userId) {
    return this.http({
      url: `/secure/profil/${userId}`,
      method: 'delete',
    });
  }

  /**
   * Search a users.
   * @param {string} term - The partial username, firstName or Last name.
   * @return {Object} A Promise
   */
  searchUser(term, limit) {
    return this.http({
      url: '/secure/profil/search/',
      method: 'get',
      params: {
        q: term,
        l: limit,
      },
    });
  }

  // FRIEND
  /**
   * Search a users.
   * @param {string} term - The partial username, firstName or Last name.
   * @return {Object} A Promise
   */
  addFriend(friendId) {
    return this.http({
      url: `/secure/profil/friend/${friendId}`,
      method: 'post',
    });
  }

  /**
   * Refuse a friendship.
   * @param {string} friendId - The friend Id
   * @return {Object} A Promise
   */
  refuseFriend(friendId) {
    return this.http({
      url: `/secure/profil/friend/${friendId}/refuse`,
      method: 'put',
    });
  }

  /**
   * Refuse a friendship.
   * @param {string} friendId - The friend Id
   * @return {Object} A Promise
   */
  deleteFriend(userId, friendId) {
    return this.http({
      url: `/secure/profil/friend/${friendId}`,
      method: 'delete',
      data: {
        userId,
      },
    });
  }

  /**
   * Accept a friendship.
   * @param {string} friendId - The friend Id
   * @return {Object} A Promise
   */
  acceptFriend(friendId) {
    return this.http({
      url: `/secure/profil/friend/${friendId}/accept`,
      method: 'put',
    });
  }

  // POST
  /**
   * Add a new post.
   * @param {object} post - Data who describe a post.
   * @return {Object} A Promise
   */
  addPost(post) {
    return this.http({
      url: '/secure/profil/post/',
      method: 'post',
      data: post,
    });
  }

  /**
   * Delete a given post.
   * @param {string} postId - The id of the post.
   * @return {Object} A Promise
   */
  deletePost(postId) {
    return this.http({
      url: `/secure/profil/post/${postId}`,
      method: 'delete',
    });
  }

  /**
   * Delete a given post.
   * @param {string} postId - The id of the post.
   * @return {Object} A Promise
   */
  updatePost(post) {
    return this.http({
      url: `/secure/profil/post/${post.id}`,
      method: 'put',
      data: post,
    });
  }

  /**
   * Add a comment to a post.
   * @param {string} postId - The id of the post.
   * @param {object} comment - The comment.
   * @return {Object} A Promise
   */
  addPostComment(postId, comment) {
    return this.http({
      url: `/secure/profil/post/${postId}/comment/`,
      method: 'post',
      data: comment,
    });
  }

  // DISCUSSION
  /**
   * Add a new discussion between friends.
   * @param {object} discussion - The discussion object
   * @return {Object} A Promise
   */
  addDiscussion(discussion) {
    return this.http({
      url: '/secure/profil/discussion/',
      method: 'post',
      data: discussion,
    });
  }

  /**
   * Delete a given discussion.
   * @param {string} discussionId - The discussion id
   * @return {Object} A Promise
   */
  deleteDiscussion(discussionId) {
    return this.http({
      url: `/secure/profil/discussion/${discussionId}`,
      method: 'delete',
    });
  }

  /**
   * Add a new discussion message.
   * @param {string} discussionId - The discussion Id
   * @param {string} message - The message
   * @return {Object} A Promise
   */
  addDiscussionMessage(discussionId, message) {
    return this.http({
      url: `/secure/profil/discussion/${discussionId}/message`,
      method: 'post',
      data: message,
    });
  }

  // NOTIFICATION
  getNotifications() {
    return this.http({
      url: '/secure/profil/notification/',
      method: 'get',
    });
  }

  deleteNotification(key, value) {
    return this.http({
      url: '/secure/profil/notification/',
      method: 'delete',
      data: {
        key,
        value,
      },
    });
  }

  /**
   * Save token in storage.
   * @param {String} token - The token to save
   */
  setToken(token) {
    this.storage.set('token', token);
  }

  /**
   * Get the token from storage.
   * @return {String} The token
   */
  getToken() {
    return this.storage.get('token');
  }

  /**
   * Check if a token is stored.
   * @return {Boolean} Tru if token exists
   */
  hasToken() {
    return this.getToken() !== null;
  }

  /**
   * Removed the stored token.
   */
  removeToken() {
    this.storage.remove('token');
  }
}
