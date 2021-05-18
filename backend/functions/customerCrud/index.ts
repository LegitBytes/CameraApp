import {handlerPath} from '@libs/handlerResolver';
import {customerSchema} from './schema'

export const addCustomer = {
    handler : `${handlerPath(__dirname)}/handler.addCustomer`,
    events : [
        {
            http : {
                method : 'post',
                path : 'customer/addCustomer',
                request :{
                    schema :{
                        "application/json" : customerSchema
                    }
                }
            }
        }
    ]
} 

export const getCustomerById = {
    handler : `${handlerPath(__dirname)}/handler.getCustomerById`,
    events : [
        {
            http : {
                method : 'get',
                path : 'customer/getCustomer/{customerId}',
            }
        }
    ]
} 

export const getAllCustomer = {
    handler : `${handlerPath(__dirname)}/handler.getAllCustomer`,
    events : [
        {
            http : {
                method : 'get',
                path : 'customer/getAllCustomer',
            }
        }
    ]
}
export const updateCustomer = {
    handler : `${handlerPath(__dirname)}/handler.updateCustomer`,
    events : [
        {
            http : {
                method : 'patch',
                path : 'customer/updateCustomer/{customerId}',
            }
        }
    ]
}
export const deleteCustomer = {
    handler : `${handlerPath(__dirname)}/handler.deleteCustomer`,
    events : [
        {
            http : {
                method : 'delete',
                path : 'customer/deleteCustomer/{customerId}',
            }
        }
    ]
}