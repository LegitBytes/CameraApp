export const adUserSchema = {
    type : 'object',
    properties : {
        name : {
            type : "string"
        },
        email : {
            type : "string"
        },
        organisationId : {
            type :"string"
        },
        integratorId : {
            type : "string"
        }

    },
    required : ['name', 'email', 'organisationId', 'integratorId']
}

export const updateUserSchema = {
    type : 'object',
    properties : {
        name : {
            type : "string"
        },
        email : {
            type : "string"
        },
        isDisabled : {
            type : 'boolean'
        },
        organisationId : {
            type : 'string'
        },

    }
}
