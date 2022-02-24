import {useState, useEffect, useCallback} from 'react';
import ShareMenu from 'react-native-share-menu';

const useShare = () => {
  const [sharedData, setSharedData] = useState('');
  const [sharedMimeType, setSharedMimeType] = useState('');
  const [sharedExtraData, setSharedExtraData] = useState(null);

  const handleShare = useCallback(item => {
    if (!item) {
      return;
    }

    const {mimeType, data, extraData} = item;

    setSharedData(data);
    setSharedExtraData(extraData);
    setSharedMimeType(mimeType);
  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, [handleShare]);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, [handleShare]);

  return {
    sharedData, sharedMimeType, sharedExtraData;
  }
};

export default useShare;
