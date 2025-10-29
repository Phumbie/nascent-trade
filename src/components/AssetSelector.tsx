import React from 'react';
import { Asset } from '../../types';

interface AssetSelectorProps {
  value: Asset;
  onChange: (asset: Asset) => void;
}

export const AssetSelector: React.FC<AssetSelectorProps> = ({
  value,
  onChange,
}) => {
  const assets = Object.values(Asset);

  return (
    <div className="flex gap-2 bg-surface rounded-lg p-1">
      {assets.map((asset) => (
        <button
          key={asset}
          onClick={() => onChange(asset)}
          className={`
            px-6 py-2 rounded-md font-medium transition-all
            ${value === asset
              ? 'bg-primary text-white shadow-lg'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }
          `}
        >
          {asset}
        </button>
      ))}
    </div>
  );
};

