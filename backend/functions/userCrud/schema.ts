export const adUserSchema = {
    type : 'object',
    properties : {
        name : {
            type : "string"
        },
        email : {
            type : "string"
        },
        groupId : {
            type :"string"
        },
        integratorId : {
            type : "string"
        },

    },
    required : ['name', 'email', 'groupId', 'integratorId']
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
        groupId : {
            type : 'string'
        },

    }
}
