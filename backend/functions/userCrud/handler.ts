import {adUserSchema} from './schema';
import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse } from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';

import db from '@models/db';

const addUser = async (event : any)=>{
    try {
        console.log("inside add user")
        let user = await db.user.create({
            name : event.body.name,
            email : event.body.email,
            organisationId : event.body.organisationId,
            integratorId : event.body.integratorId
        })

        return formatJSONResponse({
            body : {
                data : event.body,
                message :"Data save successfully",
                // user
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
    isDisabled ?: boolean,
    organisationId ?: string,
    integratorId ?: string
}
const updateuser = async (event)=>{

    try {
        let toUpdate : update= {};
        if(event.body.name){
            toUpdate.name = event.body.name
        }
        if(event.body.organisationId){
            toUpdate.organisationId = event.body.phone
        }
        if(event.body.integratorId){
            toUpdate.organisationId = event.body.integratorId
        }
        if(event.body.email){
            toUpdate.email = event.body.email
        }
        if(event.body.isDisabled){
            toUpdate.isDisabled = event.body.isDisabled
        }
        if(!event.pathParameters || !event.pathParameters.userId){
            return formatJSONResponse({
                success : false,
                message : "Provide userId"
            })
        }

        let userId : string = event.pathParameters.integratorId;

        console.log("toUpdate", toUpdate)
        let user = await db.user.update( toUpdate,
        {
            where : {
                userId : userId
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

const fetchSingleUser = async (event)=>{

    try{
        if(!event.pathParameters || !event.pathParameters.userId){
            return formatJSONResponse({
                success : false,
                body : {
                    message : "provide userId in params"
                }
            })
        }
        let userId = event.pathParameters.userId;
        
        let user = await db.user.findOne({
            where : {
                userId : userId
            }
        });
    
        return formatJSONResponse({
            success : true,
            body : {
                user
            }
        })
    } catch(e){
        console.error(e)
        return formatJSONResponse({message : "error occured", e})
    }
}

const fetchAllUsers = async (event)=>{

    let users = await db.user.findAll({});

    return formatJSONResponse({
        success : true,
        body : {
            users
        }
    })
}

const delete_user  = async (event)=>{

    try {

        if(!event.pathParameters || !event.pathParameters.userId){
            return formatJSONResponse({
                success : false,
                body : {
                    message : "provide userId in params"
                }
            })
        }
        let userId = event.pathParameters.integratorId;

        await db.user.destroy({
            where : {
                userId : userId
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

export const newUser = middyfy(addUser);
export const updateUser = middyfy(updateuser);
export const deleteUser = middyfy(delete_user);
export const getSingleUser = middyfy(fetchSingleUser);
export const getAllUsers = middyfy(fetchAllUsers);