import {
    formatJSONResponseStatusBadRequest,
    formatJSONResponseStatusCreated,
    formatJSONResponseStatusError,
    formatJSONResponseStatusOk,
    ValidatedEventAPIGatewayProxyEvent
} from '@libs/apiGateway';
import db from '@models/db';
import {CustomerData, CustomerDataUpdate} from './payload/response'
import Models from '@models/db';

// import {addCustomerSchema} from './payload/request';
import {customerSchema} from './schema';

const addNewCustomer : ValidatedEventAPIGatewayProxyEvent<typeof customerSchema>= async(event : any)=>{
    try{  
        
        event.body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    
        console.log("event in customer", event.body);
        let saveData = await Models.customer.create({
            ...event.body
        });

        return formatJSONResponseStatusCreated({
            message : 'Customer is created',
            saveData
        })

    }catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            message : "Error occured" + e
        })
    }
}

const findCustomeById = async (event)=>{
    try{

        if(!event.pathParameters || !event.pathParameters.customerId){
            return formatJSONResponseStatusBadRequest({
                message : "Provide customerId"
            })
        }

        const customerId = event.pathParameters.customerId;
        const  customerData : CustomerData = await db.customer.findOne({
            where : {
                customerId
            }
        })
        return formatJSONResponseStatusOk({
            message : "Data fetch successfullt",
            customerData
        })

    } catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            message : "Error occured" + e
        })
    }
}

const findAllCustomer = async (event)=>{
    try{

        const customerData : CustomerData[]= await db.customer.findAll({});
        
        return formatJSONResponseStatusOk({
            message : "Data fetched successfully",
            customerData
        })

    }catch(e){
        console.error(e);
        formatJSONResponseStatusError({
            message : "Error occured" + e
        })
    }
}

const editCustomer = async(event)=>{
    try{

        event.body = JSON.parse(event.body)

        if(!event.pathParameters || !event.pathParameters.customerId){
            return formatJSONResponseStatusBadRequest({
                message : "Provide customerId"
            })
        }
        const customerId : string = event.pathParameters.customerId;
        console.log("customerId", customerId)
        const toUpdate : CustomerDataUpdate = {...event.body};
        console.log("to update", toUpdate)
        const customerUpdate = await db.customer.update(toUpdate,
            {
                where : {
                    customerId
                }
            })
        return formatJSONResponseStatusOk({
            message : "Customer updated successfully",
            customerUpdate
        })
    }catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            message : "Error occured" + e
        })
    }
}

const removeCustomer = async (event)=>{
    try {

        if(!event.pathParameters || !event.pathParameters.customerId){
            return formatJSONResponseStatusBadRequest({
                message : "Provide customerId"
            })
        }
        const customerId : string = event.pathParameters.customerId;

        const data = await db.customer.destroy({
            where : {
                customerId
            }
        })
        return formatJSONResponseStatusOk({
            message : "Customer is deleted",
            data
        })
    }catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            message : "Error occured" + e
        })
    }
}

export const addCustomer = addNewCustomer;
export const getCustomerById = findCustomeById;
export const getAllCustomer = findAllCustomer;
export const updateCustomer = editCustomer;
export const deleteCustomer = removeCustomer;


