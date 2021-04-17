
export enum ELeaderboardAction {
  UNKNOWN = 'LEADER:UNKNOWN',
  LEADER_GET_STATS = 'LEADER:GET_STATS',
  LEADER_PUSH_RESULT = 'LEADER:PUSH_RESULT',
}

export interface ILeaderboardStatsData {
  cursor: number
  limit: number
}

export interface ILeaderResult {
  name: string
  level?: number
  avatar?: string
  score: number
}



