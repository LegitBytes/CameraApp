// import {adUserSchema} from './schema';
// import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse, formatJSONResponseStatusError, formatJSONResponseStatusOk } from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import Constants from '@constants/constants';
import db from '@models/db';
import { Sequelize} from 'sequelize';

const addUser = async (event : any)=>{
    try {
        console.log("inside add user")
        let user = await db.user.create({
            name : event.body.name,
            email : event.body.email,
            groupId : event.body.groupId,
            integratorId : event.body.integratorId
        })
      
        await Promise.all([
            user.addCustomer(event.body.customerId),
            user.addSite(event.body.siteId),
            user.addCamera(event.body.cameraId)
        ]).then(result=>{
            console.log("inside result", result)
        }).catch(e=>{
            console.error(e)
            return formatJSONResponseStatusError({
                message : Constants.SERVERERROR,
                e
            })
        })
        
        return formatJSONResponseStatusOk({
            body : {
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
    isDisabled ?: boolean,
    groupId ?: string,
    integratorId ?: string
}
const updateuser = async (event)=>{

    try {
      
        const toUpdate : update = {...event.body}
      
        if(!event.pathParameters || !event.pathParameters.userId){
            return formatJSONResponse({
                success : false,
                message : "Provide userId"
            })
        }

        const userId : string = event.pathParameters.userId;

        console.log("toUpdate", toUpdate)
        const user = await db.user.update( toUpdate,
        {
            where : {
                userId : userId
            }
        })

        return formatJSONResponse({
            success : true,
            message : Constants.DATAUPDATED,
            body : {
                user
            }
        })
    }catch(e){
        console.error(e)
        return formatJSONResponse({
            success : false,
            message : Constants.SERVERERROR,
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
        
        let user  = await db.user.findOne({
            where : {
                userId : userId
            },
            include : [
                {
                    model : db.customer, 
                    as : 'customers', 
                    through : {
                        attributes : []
                    }
                },
                {
                    model : db.site, 
                    as : 'sites',
                    through : {
                        attributes : []
                    }
                },
                {
                    model : db.camera, 
                    as : 'cameras',
                    through : {
                        attributes : []
                    }
                }
            ]
        });
    
        return formatJSONResponse({
            success : true,
            message : Constants.DATAFETCH,
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
    console.log("fetch all users")
    let users = await db.user.findAll({
        attributes : {
            include : [
                [Sequelize.fn('COUNT', Sequelize.col("customers.customerId")), "customerCount"],
                [Sequelize.fn('COUNT', Sequelize.col('sites.siteId')), 'siteCount'],
                [Sequelize.fn('COUNT', Sequelize.col('cameras.cameraId')), 'cameraCount']
            ]
        },
        include : [
            {
                model : db.customer, 
                as : 'customers', 
                attributes : [],
                through : {
                    attributes : []
                }
            },
            {
                model : db.site, 
                as : 'sites',
                attributes : [],
                through : {
                    attributes : []
                }
            },
            {
                model : db.camera, 
                as : 'cameras',
                attributes : [],
                through : {
                    attributes : []
                }
            }
        ],
        group : ['user.userId', 'sites.siteId', 'cameras.cameraId']
    });

    return formatJSONResponse({
        success : true,
        message : Constants.DATAFETCH,
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
        let userId = event.pathParameters.userId;

        await db.user.destroy({
            where : {
                userId : userId
            }
        })
        return formatJSONResponse({
            success : true,
            body : {
                message : Constants.DATADELETED
            }
        })

    } catch(e){
        console.error(e);
        return formatJSONResponse({
            success : false,
            message : Constants.SERVERERROR,
            e : e
        })
    }
}

const userCustomer = async (event)=>{
    try {

        if(!event.pathParameters || !event.pathParameters.userId){
            return formatJSONResponse({
                success : false,
                body : {
                    message : "provide userId in params"
                }
            })
        }
        const userId = event.pathParameters.userId;
        const users = await db.user.findOne({ 
            where : {
                userId
            },
            include : {model : db.customer}
        })

        return formatJSONResponseStatusOk({
            success : true,
            message : Constants.DATAFETCH,
            data : users
        })

    } catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            success : false,
            message  : Constants.SERVERERROE
        })
    }
}

const updateUserWithCustomer  = async (event)=>{

    try {
        console.log(event.body)
        const {userId, customerId} = event.body;

        let user = await db.user.findByPk(userId)
        // let customer = await db.customer.findByPk(customerId)
        // await user.addCustomer(customerId);
        await user.setCustomer(customerId)
        let count = await user.countCustomer();

        return formatJSONResponse({
            success : true,
            body : {
                message : Constants.DATAUPDATED,
                // user,
                // customer
                count
            }
        })

    } catch(e){
        console.error(e);
        return formatJSONResponse({
            success : false,
            e : e
        })
    }
}

const assignSiteTo_User = async (event)=>{
    try {

        if(!event.pathParameters || !event.pathParameters.userId){
            return formatJSONResponse({
                success : false,
                body : {
                    message : "provide userId in params"
                }
            })
        }

        const siteId = event.body.siteId;

        const userId = event.pathParameters.userId;
        const user = await db.user.findByPk(userId);

        await user.setSite(siteId);

        return formatJSONResponseStatusOk({
            success : true,
            message : Constants.DATAFETCH
        })

    } catch(e){
        console.error(e);
        return  formatJSONResponseStatusError({
            success : false,
            message : Constants.SERVERERROR,
            e
        })
    }
}

export const newUser = middyfy(addUser);
export const updateUser = middyfy(updateuser);
export const deleteUser = middyfy(delete_user);
export const getSingleUser = middyfy(fetchSingleUser);
export const getAllUsers = middyfy(fetchAllUsers);
export const userWithCustomer = middyfy(userCustomer);
export const customerToUser = middyfy(updateUserWithCustomer)
export const assignSiteToUser = middyfy(assignSiteTo_User)