import * as apiCall from '../typescript/apiHelper';
import { apiClient } from '../typescript/apiConfig';
import { dashboardAPI } from '../typescript/dashboard/interDash';
import * as authAPI from '../typescript/apiCaller';
import *  as interfaces from '../typescript/interfaces';
import * as apiHandler from '../typescript/api.wrap';

export {
    apiCall,
    apiClient,
    dashboardAPI,
    authAPI,
    interfaces,
    apiHandler,
    generateMessage,
    showErrorMessage,
    showSuccessMessage

}