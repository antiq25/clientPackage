const widgetData = (widgetId, settings, code, clickCount, viewCount, params) => { 
  return {
    id: widgetId,
    settings: settings,
    code: code,
    clickCount: clickCount,
    viewCount: viewCount,
    params: params
  }
};

export default widgetData;
