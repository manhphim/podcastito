import { useEffect, useState } from 'react';
import { SetupService } from '../../services';

export default function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      await SetupService();
      if (unmounted) return;
      setPlayerReady(true);
    })();

    return () => {
      unmounted = true;
    };
  }, []);
  return playerReady;
}
