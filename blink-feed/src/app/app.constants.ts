export const API_CONSTANTS = {
  HACKER_NEWS_API: 'https://hacker-news.firebaseio.com/v0'
}

export const APP_CONSTANTS = {
  pageSize: 30,
  intialPage: 1,
}

export const STORY_TYPES= {
  TOP: 'topstories',
  NEW: 'newstories',
  BEST: 'beststories',
  ASK: 'askstories',
  JOB: 'jobstories',
  SHOW: 'showstories',
} as const;

export type StoryType = typeof STORY_TYPES[keyof typeof STORY_TYPES];
