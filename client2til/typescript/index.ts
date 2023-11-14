import * as Wrapper from './apiWrap'
import * as Config from './apiConfig'
import * as Handler from './apiCaller'
import * as Promise from './interfaces'
//  utility
import * as ElementFinder from './utility/locateElement'
import * as EventHandler from './utility/eventHandler'
import * as DashElementHandler from './dashboard/locateScrapes'
import * as DashAPIFinder from './dashboard/interDash'

export default {
  Wrapper,
  Config,
  Handler,
  Promise,
  ElementFinder,
  EventHandler,
  DashElementHandler,
  DashAPIFinder
}
