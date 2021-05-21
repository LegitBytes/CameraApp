import { middyfy } from '@libs/lambda';
import {siteSchema} from './schema';
import {
    formatJSONResponseStatusBadRequest,
    formatJSONResponseStatusCreated,
    formatJSONResponseStatusError,
    formatJSONResponseStatusOk,
    ValidatedEventAPIGatewayProxyEvent
} from '@libs/apiGateway';

import  Models from '@models/db';
import { updateSiteSchema} from './payload/request'
import constants from  '@constants/constants'

const  newNddSite : ValidatedEventAPIGatewayProxyEvent<typeof siteSchema>= async(event : any)=>{
    try{

        let site = await Models.site.create({...event.body})

        return formatJSONResponseStatusCreated({
            message : constants.DATASAVE,
            site
        })
    } catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            success : false,
            message : constants.SERVERERROR,
            e
        })
    }
}

const editSite = async (event : any)=>{
    try{

        if(!event.pathParameters && !event.pathParameters.siteId){
            return formatJSONResponseStatusBadRequest({
                message : "Provide siteId in params",
                success : false
            })
        }
        const siteId : string = event.pathParameters.siteId;

        const toUpdate : updateSiteSchema = event.body;


        let siteData = await Models.site.update(toUpdate, {
            where : {
                siteId
            }
        })

        return formatJSONResponseStatusOk({
            success : true,
            message : constants.DATAUPDATED,
            siteData
        })

    } catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            success : false,
            message : constants.SERVERERROR,
            e
        })
    }
}

const singleSite = async (event : any)=>{
    try{
        
        if(!event.pathParameters && !event.pathParameters.siteId){
            return formatJSONResponseStatusBadRequest({
                message : "Provide siteId in params",
                success : false
            })
        }

        const siteId = event.pathParameters.siteId;
        const siteData = await Models.site.findOne({
            where : {siteId},
            // include : [
            //    {model : Models.customer}
            // ]
        });

        return formatJSONResponseStatusOk({
            success : true,
            message : constants.DATAFETCH,
            siteData
        })

    }catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            success : false,
            message : constants.SERVERERROR,
            e
        })
    }
}

const fetchAllSites = async (event)=>{
    try {

        const siteData = await Models.site.findAll();
        return formatJSONResponseStatusOk({
            success : true,
            message : constants.DATAFETCH,
            siteData
        })

    }catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            success : false,
            message : constants.SERVERERROR,
            e
        })
    }
}

const removeSite = async (event)=>{

    try{

        if(!event.pathParameters && !event.pathParameters.siteId){
            return formatJSONResponseStatusBadRequest({
                message : "Provide siteId in params",
                success : false
            })
        }
        const siteId = event.pathParameters.siteId;
        const siteDelete = await Models.site.destroy({
            where : {siteId}
        })
        return formatJSONResponseStatusOk({
            success : true,
            message : constants.DATADELETED,
            siteDelete
        })
    }catch(e){
        console.error(e);
        return formatJSONResponseStatusError({
            success : false,
            message : constants.SERVERERROR,
            e
        })
    }
}

export const addNewSite = middyfy(newNddSite);
export const updateSite = middyfy(editSite);
export const siteById = middyfy(singleSite);
export const getAllSite = middyfy(fetchAllSites);
export const deleteSite = middyfy(removeSite);