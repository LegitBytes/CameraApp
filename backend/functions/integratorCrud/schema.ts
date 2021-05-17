export const addIntegratorSchema = {
    type : 'object',
    properties : {
        name : {
            type : "string"
        },
        email : {
            type : "string"
        },
        phone : {
            type : "number"
        }
    },
    required : ['name', 'email', 'phone']
}

export const updateIntegratorSchema = {
    type : 'object',
    properties : {
        name : {
            type : "string"
        },
        email : {
            type : "string"
        },
        phone : {
            type : "number"
        },
        isDisabled : {
            type : 'boolean'
        }
    }
}
