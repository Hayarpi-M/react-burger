import type { Middleware, MiddlewareAPI, AnyAction } from 'redux';
import type { RootState, AppDispatch } from '../../types/store';
import { getCookie } from '../../utils/cookies';

interface IWSActions {
  wsInit: string;
  wsSendMessage?: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
}

export const createWsMiddleware = (wsActions: IWSActions, isPrivate: boolean = false): Middleware<{}, RootState, AppDispatch> => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch } = store;
      if (typeof action !== 'object' || action === null || typeof (action as AnyAction).type !== 'string') {
        return next(action);
      }
      const { type, payload } = action as AnyAction;

      if (type === wsActions.wsInit) {
        const token = isPrivate
        ? getCookie('accessToken') || localStorage.getItem('accessToken') || ''
        : '';
        console.log('🧪 Extracted WS token:', token); 
        const wsUrl = isPrivate ? `${payload}?token=${token}` : payload;
        console.log('🔐 WS token used:', token); // optional debug
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = () => dispatch({ type: wsActions.onOpen });
        socket.onerror = (event: Event) => dispatch({  
          type: wsActions.onError,
          payload: {
            message: 'WebSocket error',
          }, });
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log('📦 WS message received:', JSON.stringify(data, null, 2)); 
          if (data?.message === 'Invalid or missing token') {
            socket?.close();
            dispatch({
              type: 'auth/wsInvalidToken', 
              payload: data.message,
            });

            return;
          }
          dispatch({ type: wsActions.onMessage, payload: data });
        };
        socket.onclose = (event: CloseEvent) => dispatch({ 
          type: wsActions.onClose,
          payload: {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean,
          }, });

        if (type === wsActions.wsSendMessage && payload) {
          socket.send(JSON.stringify(payload));
        }

        if (type === wsActions.onClose) {
          socket.close();
        }
      }

      return next(action);
    };
  };
};