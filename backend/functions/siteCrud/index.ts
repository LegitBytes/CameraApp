import {handlerPath} from '@libs/handlerResolver';
import {siteSchema} from './schema'

export const addNewSite = {
    handler : `${handlerPath(__dirname)}/handler.addNewSite`,
    events : [
        {
            http : {
                method : 'post',
                path : 'site/addSite',
                request : {
                    schema : {
                        'application/json' : siteSchema
                    }
                }                    
            }
        }
    ]
}

export const getSiteById = {
    handler : `${handlerPath(__dirname)}/handler.siteById`,
    events : [
        {
            http : {
                method : 'get',
                path : 'site/getSiteById/{siteId}',
            }
        }
    ]
} 
export const getAllSite = {
    handler : `${handlerPath(__dirname)}/handler.getAllSite`,
    events : [
        {
            http : {
                method : 'get',
                path : 'site/getAllSite',
            }
        }
    ]
}
export const updateSite = {
    handler : `${handlerPath(__dirname)}/handler.updateSite`,
    events : [
        {
            http : {
                method : 'patch',
                path : 'site/updateSite/{siteId}',
            }
        }
    ]
}
export const deleteSite = {
    handler : `${handlerPath(__dirname)}/handler.deleteSite`,
    events : [
        {
            http : {
                method : 'delete',
                path : 'site/deleteSite/{siteId}',
            }
        }
    ]
}