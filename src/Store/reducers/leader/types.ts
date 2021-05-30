// eslint-disable-next-line no-shadow
export enum ELeaderState {
  UNKNOWN = 'LEADER:UNKNOWN',
  PENDING = 'LEADER:PENDING',
  READY = 'LEADER:READY',
}

// eslint-disable-next-line no-shadow
export enum ELeaderAction {
  LEADER_ADD = 'LEADER:ADD',
  LEADER_GET = 'LEADER:GET',
  LEADER_PENDING = 'LEADER:SET_PENDING',
  LEADER_UNKNOWN = 'LEADER:SET_UNKNOWN',
}
