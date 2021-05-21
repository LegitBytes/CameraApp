import {handlerPath} from '@libs/handlerResolver';
import {adUserSchema,updateUserSchema} from './schema'

// import {addIntegratorSchema} from '../integratorCrud/schema';
export const addUser = {
    handler : `${handlerPath(__dirname)}/handler.newUser`,
    events : [
        {
            http:{
                method: 'post',
                path: 'integrator/addUser/{integratorId}',
                request : {
                    schema : {
                        'application/json' : adUserSchema
                    }
                }
            }
        }
    ]
}

export const updateUser = {
    handler : `${handlerPath(__dirname)}/handler.updateUser`,
    events : [
        {
            http:{
                method: 'post',
                path: 'integrator/updateUser/{userId}',
                request : {
                    schema : {
                        'application/json' : updateUserSchema
                    }
                }
            }
        }
    ]
}

export const getAllUsers = {
    handler : `${handlerPath(__dirname)}/handler.getAllUsers`,
    events : [
        {
            http:{
                method: 'get',
                path: 'integrator/getAllUsers/{integratorId}',
            }
        }
    ]
}

export const getSingleuser = {
    handler : `${handlerPath(__dirname)}/handler.getSingleUser`,
    events : [
        {
            http:{
                method: 'get',
                path: 'integrator/getSingleUser/{userId}',
            }
        }
    ]
}

export const deleteuser = {
    handler : `${handlerPath(__dirname)}/handler.deleteUser`,
    events : [
        {
            http:{
                method: 'delete',
                path: 'integrator/deleteuser/{userId}',
            }
        }
    ]
}

export const userWithCustomer = {
    handler : `${handlerPath(__dirname)}/handler.userWithCustomer`,
    events : [
        {
            http : {
                method : 'get',
                path : 'user/getUserWithCustomer'
            }
        }
    ]
}

export const assignCustomerToUser = {
    handler : `${handlerPath(__dirname)}/handler.assignCustomerToUser`,
    events : [
        {
            http : {
                method : 'post',
                path : 'user/assignCustomerToUser/{{userId}}'
            }
        }
    ]
}

export const customerToUser = {
    handler : `${handlerPath(__dirname)}/handler.customerToUser`,
    events : [
        {
            http:{
                method: 'post',
                path: 'integrator/customerToUser',
            }
        }
    ]
}