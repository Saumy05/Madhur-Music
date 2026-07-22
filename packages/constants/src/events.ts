export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  PLAYBACK_STATE_CHANGED: 'playback:state_changed',
  TRACK_PROGRESS: 'playback:track_progress',
  QUEUE_UPDATED: 'queue:updated',
  NOTIFICATION_RECEIVED: 'notification:received',
  LISTENING_PARTY_JOIN: 'party:join',
  LISTENING_PARTY_SYNC: 'party:sync',
} as const;
