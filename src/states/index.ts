import { atomWithStorage } from 'jotai/utils'

import { AssetSortType, AssetViewType } from 'src/components/assetsView/types'

export const assetViewChoosedAtom = atomWithStorage<AssetViewType>(
  'displayChoosed',
  AssetViewType.GRID
)

export const assetSortChoosedAtom = atomWithStorage<AssetSortType>(
  'sortChoosed',
  AssetSortType.VALUE
)

export const assetSortReverseAtom = atomWithStorage<boolean>(
  'sortReverse',
  false
)
