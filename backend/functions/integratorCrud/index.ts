import {handlerPath} from '@libs/handlerResolver';
import {addIntegratorSchema,updateIntegratorSchema} from './schema'
export const addIntegrator = {
    handler : `${handlerPath(__dirname)}/handler.newIntegrator`,
    events : [
        {
            http:{
                method: 'post',
                path: 'admin/addIntegrator',
                request : {
                    schema : {
                        'application/json' : addIntegratorSchema
                    }
                }
            }
        }
    ]
}

export const updateIntegrator = {
    handler : `${handlerPath(__dirname)}/handler.updateIntegrator`,
    events : [
        {
            http:{
                method: 'post',
                path: 'admin/updateIntegrator/{integratorId}',
                request : {
                    schema : {
                        'application/json' : updateIntegratorSchema
                    }
                }
            }
        }
    ]
}

export const getAllIntegrator = {
    handler : `${handlerPath(__dirname)}/handler.getAllIntegrator`,
    events : [
        {
            http:{
                method: 'get',
                path: 'admin/getAllIntegrator',
            }
        }
    ]
}


export const getSingleIntegrator = {
    handler : `${handlerPath(__dirname)}/handler.getIntegrator`,
    events : [
        {
            http:{
                method: 'get',
                path: 'admin/getIntegrator/{integratorId}',
            }
        }
    ]
}

export const deleteIntegrator = {
    handler : `${handlerPath(__dirname)}/handler.deleteIntegrator`,
    events : [
        {
            http:{
                method: 'delete',
                path: 'admin/deleteIntegrator/{integratorId}',
            }
        }
    ]
}
