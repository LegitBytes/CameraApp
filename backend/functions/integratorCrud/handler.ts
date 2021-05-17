import {addIntegratorSchema, updateIntegratorSchema} from './schema';
import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse } from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';

import db from '@models/db';

const addIntegrator: ValidatedEventAPIGatewayProxyEvent<typeof addIntegratorSchema> = async (event : any)=>{
    try {
        let user = await db.integrator.create({
            name : event.body.name,
            email : event.body.email,
            phone : event.body.phone
        })


        return formatJSONResponse({
            body : {
                data : event.body,
                message :"Data save successfully",
                user
            }
            
        })

    } catch(e){
        console.error(e)
        return formatJSONResponse({message : "error occured", e})
    }
    
}

interface update {
    name ?: string,
    email ?: string,
    phone ?: string,
    isDisabled ?: boolean
}
const updateintegrator = async (event)=>{

    try {
        let toUpdate : update= {};
        if(event.body.name){
            toUpdate.name = event.body.name
        }
        if(event.body.phone){
            toUpdate.phone = event.body.phone
        }
        if(event.body.email){
            toUpdate.email = event.body.email
        }
        if(event.body.isDisabled){
            toUpdate.isDisabled = event.body.isDisabled
        }

        if(!event.pathParameters || !event.pathParameters.integratorId){
            return formatJSONResponse({
                success : false,
                message : "Provide Integrator Id"
            })
        }

        let integratorId : string = event.pathParameters.integratorId
        console.log(integratorId)
        console.log("toUpdate", toUpdate)
        let user = await db.integrator.update( toUpdate,
        {
            where : {
                integratorId : integratorId
            }
        })

        return formatJSONResponse({
            success : true,
            body : {
                user
            }
        })
    }catch(e){
        return formatJSONResponse({
            success : false,
            e : e
        })
    }
    
}

const fetchIntegrator = async (event)=>{

    try{
        if(!event.pathParameters || !event.pathParameters.integratorId){
            return formatJSONResponse({
                success : false,
                body : {
                    message : "provide integratorId in params"
                }
            })
        }
        let integrator = await db.integrator.findOne({
            where : {
                integratorId : event.pathParameters.integratorId
            }
        });
    
        return formatJSONResponse({
            success : true,
            body : {
                integrator
            }
        })
    } catch(e){
        console.error(e)
        return formatJSONResponse({message : "error occured", e})
    }
    
}
const fetchAllIntegrator = async (event)=>{

    let integrators = await db.integrator.findAll({});

    return formatJSONResponse({
        "type" : typeof updateIntegratorSchema,
        body : {
            integrators
        }
    })
}

const delete_integrator  = async (event)=>{

    try {

        if(!event.pathParameters || !event.pathParameters.integratorId){
            return formatJSONResponse({
                success : false,
                body : {
                    message : "provide integratorId in params"
                }
            })
        }
        await db.integrator.destroy({
            where : {
                integratorId : event.pathParameters.integratorId
            }
        })
        return formatJSONResponse({
            success : true,
            body : {
                message : 'Integrator is deleted'
            }
        })

    } catch(e){
        return formatJSONResponse({
            success : false,
            e : e
        })
    }
    
}

export const newIntegrator = middyfy(addIntegrator);
export const updateIntegrator = middyfy(updateintegrator);
export const deleteIntegrator = middyfy(delete_integrator);
export const getIntegrator = middyfy(fetchIntegrator);
export const getAllIntegrator = middyfy(fetchAllIntegrator);