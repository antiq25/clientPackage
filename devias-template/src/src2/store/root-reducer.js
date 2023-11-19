import { combineReducers } from '@reduxjs/toolkit';

import { reducer as calendarReducer } from 'src/src2/slices/calendar';
import { reducer as chatReducer } from 'src/src2/slices/chat';
import { reducer as kanbanReducer } from 'src/src2/slices/kanban';
import { reducer as mailReducer } from 'src/src2/slices/mail';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
});
