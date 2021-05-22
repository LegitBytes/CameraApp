export  const siteSchema = {
    type : 'object',
    properties : {
        customerId : {
            type : 'string'
        },
        siteName : {
            type : 'string',
        },
        groupId : {
            type : 'string',
        },
        integratorId : {
            type : 'string'
        },
        userId : {
            type : 'array'
        }
    },
    required : ['customerId', 'siteName', 'groupId', 'integratorId']
}