'use strict';

import Utils from './utils';

const service = {
    fetchClients,
    fetchTables
};

export default service;

const ORIGIN = undefined;
// const ORIGIN = 'http://h-pbis-01.do.veltio.com.br';

function fetchClients(callback) {

    return new Promise((resolve, reject) => {

        return Utils.sendHttpRequest({
            method: 'GET',
            origin: ORIGIN,
            url: '/pentaho/plugin/ppa/api/clients',
            // headers: [
            //     ['Authorization', `Basic ${new Buffer('admin:password').toString('base64')}`]
            // ]
        }).then((data) => {
            data = JSON.parse(data);

            const clients = [];
            const resultset = data.resultset;
            const metadata = data.metadata;
            const index = {};

            metadata.map(meta => {
                index[meta.colName] = meta.colIndex;
            });

            resultset.map(result => {
                clients.push({
                    label: result[index['client_id']],
                    value: result[index['client_id']]
                });
            });

            if(callback) callback(clients);
            resolve(clients);
        }).catch((error) => {
            if(callback) callback();
            reject(error);
        });
    });
}

function fetchTables(params, callback) {

    return Promise.all([
        fetchTablesData(params),
        fetchETLExecutions(params),
        fetchValidations(params)
    ]).then(values => {
        const tables = values[0];
        const executions = values[1];
        const validations = values[2];

        tables.map(table => {
            getExecutions(table);
            getValidations(table);
        });

        function getExecutions(table) {

            executions.map(execution => {
                if(execution.id.indexOf(table.name) >= 0) {
                    table.executions.push(execution);
                }
            });
        }

        function getValidations(table) {

            if(validations[table.name]) {
                for(const id in validations[table.name]) {
                    table.validations.push(validations[table.name][id]);
                }
            }
        }

        if(callback) callback(tables);
        return tables;
    }).catch(() => {
        if(callback) callback();
        return [];
    });

}

function fetchTablesData({ connection, clientId }) {

    return new Promise((resolve, reject) => {

        return Utils.sendHttpRequest({
            method: 'GET',
            origin: ORIGIN,
            url: `/pentaho/plugin/ppa/api/tables?paramcnx=${connection}&paramclient_id=${clientId}`,
        }).then((data) => {
            data = JSON.parse(data);

            const tables = [];
            const resultset = data.resultset;
            const metadata = data.metadata;
            const index = {};

            metadata.map(meta => {
                index[meta.colName] = meta.colIndex;
            });

            resultset.map(result => {
                tables.push({
                    name: result[index['table_name']],
                    type: result[index['table_type']],
                    totalRows: result[index['total_rows']],
                    clientRows: result[index['client_rows']],
                    executions: [],
                    validations: []
                });
            });

            resolve(tables);
        }).catch((error) => {
            reject(error);
        });
    });
}

function fetchETLExecutions({ connection, clientId }) {

    return new Promise((resolve, reject) => {

        return Utils.sendHttpRequest({
            method: 'GET',
            origin: ORIGIN,
            url: `/pentaho/plugin/ppa/api/etlexecutions?paramcnx=${connection}&paramclient_id=${clientId}`,
        }).then((data) => {
            data = JSON.parse(data);

            const executions = [];
            const resultset = data.resultset;
            const status = {
                end: 'sucesso',
                running: 'em execução',
                stop: 'erro'
            };
            const metadata = data.metadata;
            const index = {};

            metadata.map(meta => {
                index[meta.colName] = meta.colIndex;
            });

            resultset.map(result => {
                executions.push({
                    id: result[index['transname']],
                    status: status[result[index['status']]],
                    date: result[index['logdate']]
                });
            });

            resolve(executions);
        }).catch((error) => {
            reject(error);
        });
    });
}

function fetchValidations({ clientId }) {

    return new Promise((resolve, reject) => {

        return Utils.sendHttpRequest({
            method: 'GET',
            origin: ORIGIN,
            url: `/pentaho/plugin/dwv/api/validations?paramclient_id=${clientId}&parammethod=GET`,
        }).then((data) => {
            data = JSON.parse(data);

            const validations = {};
            const resultset = data.resultset;
            const metadata = data.metadata;
            const index = {};

            metadata.map(meta => {
                index[meta.colName] = meta.colIndex;
            });

            resultset.map(result => {
                const error = {
                    reference: result[index['referencia']],
                    referenceValue: result[index['valor_referencia']],
                    real: result[index['real']],
                    realValue: result[index['valor_real']]
                }
                const id = result[index['job_name']];
                const name = result[index['table_name']];
                const date = result[index['execution_date']];

                if(!validations[name]) {
                    validations[name] = {};
                }
                if(!validations[name][id]) {
                    validations[name][id] = {
                        id,
                        name,
                        date,
                        errors: []
                    };
                }

                validations[name][id].errors.push(error);
            });

            resolve(validations);
        }).catch((error) => {
            reject(error);
        });
    });
}
