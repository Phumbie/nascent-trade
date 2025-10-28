import { useState } from 'react';
import { Asset } from '../types';

export const useAssetSelection = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(Asset.BTC);

  return {
    selectedAsset,
    setSelectedAsset,
  };
};

