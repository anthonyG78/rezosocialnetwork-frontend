import Vue from 'vue';
import Vuex from 'vuex';
import Basil from 'basil.js';
import graphqlQueries from '../graphql/queries';
import RezoApi from '../api/rezo.api';
import navigation from './navigation.json';

const conf = process.env;
const rezoApi = new RezoApi(conf.API.rezo);
const storage = new Basil({
  storages: ['local'],
  storage: 'local',
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Common
    conf,
    dark: false,
    drawer: true,
    menu: navigation,
    loadingPage: 0,
    error: '',
    searchTerm: '',
    searchedUsers: [],
    searchedUsersPreview: [],
    // Dialog
    signoutDialogToggle: false,
    addPostDialogToggle: false,
    addPostCommentDialogToggle: false,
    addDiscussionDialogToggle: false,
    deleteProfilDialogToggle: false,
    // User
    self: null,
    user: null,
    notifications: {
      discussions: [],
      posts: [],
      friends: [],
    },
    posts: [],
    post: {},
    friends: [],
    discussions: [],
    discussion: {},
  },
  actions: {
    // User
    register({ commit }, formData) {
      return rezoApi.register(formData).then((data) => {
        const user = data.user;
        commit('setSelf', user);
      });
    },
    signin({ commit }, formData) {
      return rezoApi.signin(formData.username, formData.password).then((data) => {
        const user = data.user;
        commit('setSelf', user);
      });
    },
    signout({ commit }) {
      return rezoApi.signout().then(() => {
        commit('setSelf', null);
      });
    },
    updateProfil({ commit, state }, data) {
      return rezoApi.updateProfil(data.id, data.profil).then((user) => {
        user.accepted = state.user.accepted;
        if (user._id === state.self._id) {
          commit('setSelf', user);
        }
        commit('setUser', user);
      });
    },
    deleteProfil(context, userId) {
      return rezoApi.deleteProfil(!userId ? context.state.self._id : userId);
    },
    isAuthenticated(context) {
      return rezoApi.hasToken() && context.getters.self;
    },
    searchUser({ commit }, data) {
      return graphqlQueries.searchUsers(data.term, data.limit).then((users) => {
        commit('setSearchedUsers', users);
      });
    },
    searchFriends({ commit, state }, data) {
      const userId = !data.userId ? state.self._id : data.userId;
      return graphqlQueries.searchFriends(userId, data.term, data.limit).then((friends) => {
        commit('setFriends', friends);
      });
    },
    searchUserPreview({ commit }, data) {
      return rezoApi.searchUser(data.term, data.limit).then((users) => {
        commit('setSearchUserPreview', users);
      });
    },
    getUser({ commit, state }, userId) {
      return graphqlQueries.getUser(!userId ? state.self._id : userId).then((user) => {
        commit('setUser', user);
      });
    },
    getFriends({ commit, state }, userId) {
      return graphqlQueries.getFriends(!userId ? state.self._id : userId).then((friends) => {
        commit('setFriends', friends);
      });
    },
    addFriend(context, friendId) {
      return rezoApi.addFriend(friendId);
    },
    acceptFriend(context, friendId) {
      return rezoApi.acceptFriend(friendId);
    },
    refuseFriend(context, friendId) {
      return rezoApi.refuseFriend(friendId);
    },
    deleteFriend({ state }, data) {
      const userId = !data.userId ? state.self._id : data.userId;
      return rezoApi.deleteFriend(userId, data.friendId);
    },
    // Notifications
    getNotifications({ commit }) {
      return rezoApi.getNotifications().then((notifications) => {
        commit('setNotifications', notifications);
      });
    },
    deleteNotification({ commit }, notif) {
      return rezoApi.deleteNotification(notif.key, notif.value).then((notifications) => {
        commit('setNotifications', notifications);
      });
    },
    // Posts
    getCommunityPosts({ commit, state }, userId) {
      return graphqlQueries.getCommunityPosts(!userId ? state.self._id : userId).then((posts) => {
        commit('setPosts', posts);
      });
    },
    getPosts({ commit, state }, userId) {
      return graphqlQueries.getPosts(!userId ? state.self._id : userId).then((posts) => {
        commit('setPosts', posts);
      });
    },
    getPost({ commit }, postId) {
      return graphqlQueries.getPost(postId).then((post) => {
        commit('setPost', post);
      });
    },
    addPost({ commit }, post) {
      return rezoApi.addPost(post).then((data) => {
        commit('setPost', data);
        return data;
      });
    },
    deletePost(context, postId) {
      return rezoApi.deletePost(postId);
    },
    updatePost(context, post) {
      return rezoApi.updatePost(post).then(data => data);
    },
    addPostComment(context, data) {
      return rezoApi.addPostComment(data.postId, data.comment).then(comment => comment);
    },
    // Discussions
    getDiscussions({ commit, state }, userId) {
      const id = !userId ? state.self._id : userId;
      return graphqlQueries.getDiscussions(id).then((discussions) => {
        commit('setDiscussions', discussions);
      });
    },
    getDiscussion({ commit }, discussionId) {
      return graphqlQueries.getDiscussion(discussionId).then((discussion) => {
        commit('setDiscussion', discussion);
      });
    },
    addDiscussion({ commit }, discussion) {
      return rezoApi.addDiscussion(discussion).then((data) => {
        commit('setDiscussion', data);
        return data;
      });
    },
    deleteDiscussion(context, discussionId) {
      return rezoApi.deleteDiscussion(discussionId);
    },
    addDiscussionMessage(context, data) {
      return rezoApi.addDiscussionMessage(data.discussionId, data.message).then(message => message);
    },
  },
  mutations: {
    // Common
    setDark(state, dark) {
      state.dark = dark;
    },
    setDrawer(state, drawer) {
      state.drawer = drawer;
    },
    setSignoutDialogToggle(state, toggle) {
      state.signoutDialogToggle = toggle;
    },
    setAddPostDialogToggle(state, toggle) {
      state.addPostDialogToggle = toggle;
    },
    setAddPostCommentDialogToggle(state, toggle) {
      state.addPostCommentDialogToggle = toggle;
    },
    setAddDiscussionDialogToggle(state, toggle) {
      state.addDiscussionDialogToggle = toggle;
    },
    setDeleteProfilDialogToggle(state, toggle) {
      state.deleteProfilDialogToggle = toggle;
    },
    setLoadingPage(state, value) {
      state.loadingPage += value > 0 ? 1 : -1;
    },
    setSearchTerm(state, term) {
      state.searchTerm = term || '';
    },
    // User
    removeToken() {
      rezoApi.removeToken();
    },
    setSelf(state, user) {
      state.self = user;
      state.user = user;
      storage.set('user', user);
    },
    setUser(state, user) {
      state.user = user;

      if (state.user._id === state.self._id) {
        state.self = user;
        storage.set('user', user);
      }
    },
    setSearchedUsers(state, users) {
      state.searchedUsers = users;
    },
    setSearchUserPreview(state, users) {
      state.searchedUsersPreview = users;
    },
    setFriends(state, users) {
      state.friends = users;
    },
    setNotifications(state, notifications) {
      state.notifications = notifications;
    },
    // Posts
    setPosts(state, posts) {
      state.posts = posts;
    },
    setPost(state, post) {
      state.post = post;
    },
    // Discussions
    setDiscussions(state, discussions) {
      state.discussions = discussions;
    },
    setDiscussion(state, discussion) {
      state.discussion = discussion;
    },
  },
  getters: {
    self: (state) => {
      if (!state.self) {
        state.self = storage.get('user');
      }
      return state.self;
    },
    user: (state) => {
      if (!state.user) {
        state.user = state.self;
      }
      return state.user;
    },
    isSelf: (state, getters) => getters.user._id === getters.self._id,
    isAuthorized: (state, getters) => getters.isSelf || state.self.level < 2,
  },
  // modules: {}
  // strict: debug,
  // plugins: debug ? [createLogger()] : [],
});
