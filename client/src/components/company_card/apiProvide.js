import React, { createContext, useContext, useState } from 'react';
import { apiHandler, crawl } from 'src/api/bundle'; //
import { useAuth } from 'src/hooks/use-auth';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const userId = useAuth();
  const [apiState, setApiState] = useState({
    user: userId,
    reviews: [],
    widgets: [],
    loading: false,
    error: null,
  });

  const handleApiCall = async (apiFunc, ...params) => {
    try {
      setApiState((prevState) => ({ ...prevState, loading: true }));
      const response = await apiFunc(...params);
      setApiState((prevState) => ({
        ...prevState,
        loading: false,
        ...(response.success ? { user: response.data } : { error: response.error }),
      }));
      return response;
    } catch (error) {
      setApiState((prevState) => ({ ...prevState, loading: false, error }));
      return { success: false, error };
    }
  };

  const apiActions = {
    signup: (...params) => handleApiCall(apiHandler.handleSignup, ...params),
    login: (...params) => handleApiCall(apiHandler.handleLogin, ...params),
    verifyEmail: (...params) => handleApiCall(apiHandler.handleVerifyEmail, ...params),
    resendEmailVerification: (...params) =>
      handleApiCall(apiHandler.handleResendEmailVerification, ...params),
    getProfile: (...params) => handleApiCall(apiHandler.handleGetProfile, ...params),
    updateProfile: (...params) => handleApiCall(apiHandler.handleUpdateProfile, ...params),
    forgotPassword: (...params) => handleApiCall(apiHandler.handleForgotPassword, ...params),
    resetPassword: (...params) => handleApiCall(apiHandler.handleResetPassword, ...params),
    collectReviews: (...params) => handleApiCall(crawl.collect, ...params),
    importReviews: () => handleApiCall(crawl.import),
    getReviews: () => handleApiCall(crawl.reviews),
    getFormattedReviews: () => handleApiCall(crawl.formattedReviews),
    getBusinessNames: () => handleApiCall(crawl.businesses),
    logView: (...params) => handleApiCall(crawl.logView, ...params),
    logClick: (...params) => handleApiCall(crawl.logClick, ...params),
    getViewCount: (...params) => handleApiCall(crawl.views, ...params),
    getClickCount: (...params) => handleApiCall(crawl.clicks, ...params),
    createWidget: (...params) => handleApiCall(crawl.create, ...params),
    getWidget: (...params) => handleApiCall(crawl.getWidget, ...params),
    getUserWidgets: () => handleApiCall(crawl.userWidgets),
    getPublicWidgets: (...params) => handleApiCall(crawl.publicWidgets, ...params),
  };

  return <ApiContext.Provider value={{ apiState, apiActions }}>{children}</ApiContext.Provider>;
};

export const  useApi = () => useContext(ApiContext);
