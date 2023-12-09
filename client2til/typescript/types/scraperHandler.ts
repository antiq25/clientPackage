import { crawler } from '../types/scraper'

const crawl = () => ({
  collect: (companyNames: string[], companyLocations: string[]) => {
    return crawler.collectReviews(companyNames, companyLocations)
  },
  import: () => {
    return crawler.importReviews()
  },
  reviews: () => {
    return crawler.getReviews()
  },
  formattedReviews: () => {
    return crawler.getFormattedReviews()
  },
  businesses: () => {
    return crawler.getBusinessNames()
  },
  logView_: (userId: string, businessId: string) => {
    return crawler.logView(userId, businessId)
  },
  logClick_: (userId: string, businessId: string) => {
    return crawler.logClick(userId, businessId)
  },
  views: (userId: string, businessId: string) => {
    return crawler.getViewCount(userId, businessId)
  },
  clicks: (userId: string, businessId: string) => {
    return crawler.getClickCount(userId, businessId)
  },
  create: (userId: string, businessId: string, widgetData: any) => {
    return crawler.createWidget(userId, businessId, widgetData)
  },
  getWidget_: (userId: string, businessId: string) => {
    return crawler.getWidget(userId, businessId)
  },
  userWidgets_: () => {
    return crawler.getUserWidgets()
  }
})

export default crawl
