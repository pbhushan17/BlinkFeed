export interface NewsItem {
  id: number,
  deleted?: boolean,
  type: NewsItemType,
  by: string,
  time: number,
  text?: string,
  dead?: boolean,
  parent?: number,
  poll?: number,
  kids?: number[],
  url?: string,
  score?: number,
  title?: string,
  parts?: number[],
  descendants?: number
}


export type NewsItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
