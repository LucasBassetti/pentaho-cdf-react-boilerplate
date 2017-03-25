'use strict';

let _dashboard = undefined;

const service = {
  setDashboard,
  getDashboard,
  init,
  hasComponent,
  addComponent,
  removeComponent,
  setParameters,
  setParameter,
  fireChanges,
  fireChange,
};

export default service;

////////////

/**
* @memberof Dashboard
* @function setDashboard
* @description set dashboard
* @param {Object} dashboard - dashboard object
*/
function setDashboard(dashboard) {
  _dashboard = dashboard;
}

function getDashboard() {
  return _dashboard;
}

/**
* @memberof Dashboard
* @function init
* @description init dashboard
*/
function init() {
  _dashboard.init();
}

/**
* @memberof Dashboard
* @function hasComponent
* @description check if dashboard has the component
* @param {String} componentName - component name
* @returns {Boolean} hasComponent true or false
*/
function hasComponent(componentName) {
  const components = _dashboard.components;
  let hasComponent = false;

  if(components) {
    for(let i = 0, len = components.length; i < len; i++) {
      if(components[i].name === componentName) {
        hasComponent = true;
      }
    }
  }

  return hasComponent;
}

/**
* @memberof Dashboard
* @function addComponent
* @description add component to dashboard
* @param {Object} component - component
*/
function addComponent(component) {
  _dashboard.addComponent(component);
}

/**
* @memberof Dashboard
* @function removeComponent
* @description remove component to dashboard
* @param {String} componentName - component name
*/
function removeComponent(componentName) {
  _dashboard.removeComponent(componentName);
}

/**
* @memberof Dashboard
* @function setParameters
* @description set component params
* @param {Array} data - array of component params and values
*/
function setParameters(data) {
  for(let i = 0, len = data.length; i < len; i++) {
    _dashboard.setParameter(data[i].param, data[i].value);
  }
}

/**
* @memberof Dashboard
* @function setParameters
* @description set component params
* @param {String} param - param name
* @param {All} value - param value
*/
function setParameter(param, value) {
  _dashboard.setParameter(param, value);
}

/**
* @memberof Dashboard
* @function fireChanges
* @description fire component param changes
* @param {Array} data - array of component params and values
*/
function fireChanges(data) {
  for(let i = 0, len = data.length; i < len; i++) {
    _dashboard.fireChange(data[i].param, data[i].value);
  }
}

/**
* @memberof Dashboard
* @function fireChange
* @description fire component param change
* @param {String} param - param name
* @param {All} value - param value
*/
function fireChange(param, value) {
  _dashboard.fireChange(param, value);
}
