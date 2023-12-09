import { crawler } from '../types/scraper';
const crawl = () => ({
    collect: (companyNames, companyLocations) => {
        return crawler.collectReviews(companyNames, companyLocations);
    },
    import: () => {
        return crawler.importReviews();
    },
    reviews: () => {
        return crawler.getReviews();
    },
    formattedReviews: () => {
        return crawler.getFormattedReviews();
    },
    businesses: () => {
        return crawler.getBusinessNames();
    },
    logView_: (userId, businessId) => {
        return crawler.logView(userId, businessId);
    },
    logClick_: (userId, businessId) => {
        return crawler.logClick(userId, businessId);
    },
    views: (userId, businessId) => {
        return crawler.getViewCount(userId, businessId);
    },
    clicks: (userId, businessId) => {
        return crawler.getClickCount(userId, businessId);
    },
    create: (userId, businessId, widgetData) => {
        return crawler.createWidget(userId, businessId, widgetData);
    },
    getWidget_: (userId, businessId) => {
        return crawler.getWidget(userId, businessId);
    },
    userWidgets_: () => {
        return crawler.getUserWidgets();
    }
});
export default crawl;
