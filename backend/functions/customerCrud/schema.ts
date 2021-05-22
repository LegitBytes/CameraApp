export const customerSchema = {
    type : 'object',
    properties : {
        customerName :{
            type : 'string'
        },
        groupId : {
            type : 'string'
        },
        integratorId : {
            type : 'string'
        },
        userId : {
            type : 'array'
        },
        siteId : {
            type : 'array'
        }
    },
    additionalProperties : false,
    required : ['customerName', 'groupId', 'integratorId']
}