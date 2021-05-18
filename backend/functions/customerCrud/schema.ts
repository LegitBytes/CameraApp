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
    },
    additionalProperties : false,
    required : ['customerName', 'groupId', 'integratorId']
}