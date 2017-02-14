'use strict';

import moment from 'moment';
import Dashboard  from './dashboard';
import Components from './components';

export const STATUS = {
    'sucesso': 'green',
    'em execução': 'yellow',
    'erro': 'red'
};

export function formatDate(date) {
    return moment(date).format('HH:mm:ss - DD/MM/YYYY');
}

export function getDateDiffInHours(date) {
    return moment(moment()).diff(moment(date), 'hours');
}

export function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const service = {
    getComponentData,
    sendHttpRequest
};

export default service;

function getComponentData(filter) {

    return new Promise((resolve, reject) => {

        if(Dashboard.hasComponent(filter.id)) {
            Dashboard.removeComponent(filter.id);
        }

        const component = Components.newComponent('QueryComponent', filter.id, {
            name: filter.id,
            type: 'queryComponent',
            parameters: filter.parameters,
            listeners: filter.listeners,
            valueAsId: false,
            queryDefinition: {
                path: `/${filter.path}.cda`,
                dataAccessId: filter.id
            },
            executeAtStart: true,
            priority: 5,
            postFetch: (data) => {
                if(data) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            }
        });

        Dashboard.addComponent(component);
        Dashboard.init();
    });
}

function sendHttpRequest(spec) {

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function() {
            if (this.readyState !== 4) {
                return;
            }

            if (this.status === 200) {
                resolve(this.responseText);
            }
            else {
                reject(`Error when ${spec.method} data in ${spec.url}`);
            }
        });

        xhr.open(spec.method, `${spec.origin || location.origin}${spec.url}`);

        for(let i = 0, len = spec.headers; i < len; i++) {
            xhr.setRequestHeader(spec.headers[i][0], spec.headers[i][1]);
        }

        spec.data ? xhr.send(spec.data) : xhr.send();
    });
}
