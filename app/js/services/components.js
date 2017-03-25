'use strict';

const config = require('../../../gulp/config');

const _cdasPath = `/${config.default.projectPath}/cdas`;
const _classes = {};
const _components = {};

const service = {
  setComponentsClasses,
  newComponent,
};

export default service;

////////////

/**
* @memberof Components
* @function setComponentsClasses
* @description set component classes used to instanciate new compoenents
* @param {Object} components - components classes (ex.: QueryComponent)
*/
function setComponentsClasses(components) {
  for(const component in components) {
    _classes[component] = components[component];
  }
}

/**
* @memberof Components
* @function newComponent
* @description create a new component
* @param {String} componentClass - component class (ex.: QueryComponent)
* @param {String} id - component id
* @param {Object} options - component options
*/
function newComponent(componentClass, id, options) {
  options.queryDefinition.path = _cdasPath + options.queryDefinition.path;
  _components[id] = new _classes[componentClass](options);

  return _components[id];
}
