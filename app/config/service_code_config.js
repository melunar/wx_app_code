// 业务组中api错误码和提示信息定义
let SERVICE_CODE = {
      SERVICE_SUCCESS: { code: 200, message: "成功!" }
    , SERVICE_RECIEVE: { code: 100, message: "请求已接收" }  
    , SERVICE_USER_UNAUTHORIZED: { code: 401, message: "用户未认证" }  
    , SERVICE_INVALID_PARAMETER: { code: 400, message: "请求参数错误" }  
    , SERVICE_SERVICE_ERROR: { code: 500, message: "服务异常" }  
    , SERVICE_DBDAO_ERROR: { code: 5001, message: "数据库异常" } 
/*     
    , SERVICE_SPEAKER_NOT_EXISTED: { code: 108, message: "数据库中没有要查询的speaker" }  
    , SERVICE_SPEAKER_HAVE_NOT_VP: { code: 109, message: "speaker中没有对应的voiceprint" }  
    , SERVICE_UNKNOWN_ERROR: { code: 0101, message: "未知异常" }  
    , SERVICE_AGENT_ERROR: { code: 20102, message: "DBServiceAgent异常" }  
    , SERVICE_NETWORK_ERROR: { code: 20103, message: "网络异常" }  
    , SERVICE_INVALID_FUNCTION: { code: 0105, message: "方法名不存在" }  
    , SERVICE_FUNCTION_NO_ACCESS: { code: 0107, message: "对此方法无访问权限" }   */
};
export default SERVICE_CODE;