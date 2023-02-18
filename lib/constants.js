module.exports = {
    STATUS_USER:{
        // 0=desactivada, 1=activa, -1=suspendida, 2=eliminada
        ACTIVE:1,
        DESACTIVE:0,
        SUSPENDED:-1,
        REMOVED:2
    },
    ROLE_USER:{
        USER:1,
        LESSOR:2 //arrendador
    },
    MESSAGE_RESPONSE_CODE:{
        OK:200,
        CREATED:201,
        BAD_REQUEST:400,
        UNAUTHORIZED:401,
        NOT_FOUND:404,
        INTERNAL_SERVER_ERROR:500
        },
    MESSAGE_RESPONSE:{
        OK:"OK",
        CREATED:"Created",
        BAD_REQUEST:"Bad Request",
        UNAUTHORIZED:"Unauthorized",
        NOT_FOUND:"Not Found",
        INTERNAL_SERVER_ERROR:"Internal Server Error"
        }
}