import qmButton from './qmButton.vue';

/* istanbul ignore next */
qmButton.install = function(Vue) {
  Vue.component(qmButton.name, qmButton);
};

export default qmButton;