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
import constants from  '@constants/constants'
// import {addCustomerSchema} from './payload/request';
import {customerSchema} from './schema';

const addNewCustomer : ValidatedEventAPIGatewayProxyEvent<typeof customerSchema>= async(event : any)=>{
    try{  
        
        event.body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        
        console.log("event in customer", event.body);
        let newCustomer = await Models.customer.create({
            customerName : event.body.customerName,
            groupId : event.body.groupId,
            integratorId : event.body.integratorId
        });

        await Promise.all([
            newCustomer.addUser(event.body.userId)
        ]);

        return formatJSONResponseStatusCreated({
            success : true,
            message : constants.DATASAVE,
            newCustomer
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
            },
            include : [
                {
                    model : db.user, 
                    as : 'users', 
                    through : {
                        attributes : []
                    }
                },
                {
                    model : db.site, 
                    as : 'sites', 
                },
            ]
        })
        return formatJSONResponseStatusOk({
            message : constants.DATAFETCH,
            customerData
        })

    } catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            message : constants.SERVERERROE,
            e
        })
    }
}

const findAllCustomer = async (event)=>{
    try{

        const customerData = await db.customer.findAll({
            include : [
                {
                    model : db.user, 
                    as : 'users', 
                    through : {
                        attributes : []
                    }
                },
                {
                    model : db.site, 
                    as : 'sites', 
                },
            ]
        });
        
        return formatJSONResponseStatusOk({
            message :constants.DATAFETCH,
            customerData
        })

    }catch(e){
        console.error(e);
        formatJSONResponseStatusError({
            message : constants.SERVERERROE,
             e
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
            message : constants.DATAUPDATED,
            customerUpdate
        })
    }catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            message : constants.SERVERERROE,
            e
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
            message : constants.DATADELETED,
            data
        })
    }catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            message : constants.SERVERERROE,
            e
        })
    }
}

export const addCustomer = addNewCustomer;
export const getCustomerById = findCustomeById;
export const getAllCustomer = findAllCustomer;
export const updateCustomer = editCustomer;
export const deleteCustomer = removeCustomer;


