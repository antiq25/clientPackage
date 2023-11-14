import { authAPI, authAPIEndpoints } from './apiCaller';
import { apiCall, generateMessage, showSuccessMessage, showErrorMessage } from './apiHelper';
import apiConfig from './apiConfig';
import * as apiHandler from './apiWrap';
// # * ONLY UNCOMMENT BELOW FOR HTML5 BUILD * # // 
// import * as apiHtmlLocates from './utility/locateElement'
// import * as apiHTMLeventHandler from './utility/eventHandler'
// # * ################################# * # //  
export { authAPI, authAPIEndpoints, generateMessage, showErrorMessage, showSuccessMessage, apiCall, apiConfig, apiHandler
// // # * ONLY UNCOMMENT BELOW FOR HTML5 BUILD * # 
// apiHtmlLocates,
// apiHTMLeventHandler
// // # * ############################# * # 
 };
