import * as React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const useDashboardSocket = (handleSubscribe: (message: Stomp.Message) => any) => {
  const [stompClientInstance, setStompClientInstance] = React.useState(null);
  const [isSocketOpen, setSocketOpen] = React.useState(false);

  React.useEffect(
    () => {
      const socket = new SockJS('/socket');
      const stompClient = Stomp.over(socket);
      (stompClient as any).debug = false;
      stompClient.connect({}, (frame) => {
        if (__DEV__) {
          console.info(`API SERVICE OPEN WSS`);
        }

        stompClient.subscribe('/user/queue/data', handleSubscribe);

        setSocketOpen(true);
      });

      setStompClientInstance(stompClient);
    },
    [],
  );

  return {
    isSocketOpen,
    stompClientInstance,
  };
};

export default useDashboardSocket;
