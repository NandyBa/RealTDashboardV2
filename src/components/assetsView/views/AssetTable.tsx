import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { ScrollArea, Table } from '@mantine/core'

import { OwnedRealtoken } from 'src/store/features/wallets/walletsSelector'

export const AssetTable: FC<{ realtokens: OwnedRealtoken[] }> = (props) => {
  return (
    <ScrollArea>
      <Table>
        <thead>
          <AssetTableHeader />
        </thead>

        <tbody>
          {props.realtokens.map((item) => (
            <AssetTableRow key={item.id} value={item} />
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
AssetTable.displayName = 'AssetTable'

const AssetTableHeader: FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'assetTable' })

  return (
    <tr>
      <th>{t('property')}</th>
      <th style={{ textAlign: 'right' }}>{t('ownedValue')}</th>
      <th style={{ textAlign: 'right' }}>{t('apr')}</th>
      <th style={{ textAlign: 'right' }}>{t('ownedTokens')}</th>
      <th style={{ textAlign: 'right' }}>{t('weeklyRents')}</th>
      <th style={{ textAlign: 'right' }}>{t('yearlyRents')}</th>
      <th style={{ textAlign: 'right' }}>{t('rentedUnits')}</th>
      <th style={{ textAlign: 'right' }}>{t('propertyValue')}</th>
    </tr>
  )
}
AssetTableHeader.displayName = 'AssetTableHeader'

const AssetTableRow: FC<{ value: OwnedRealtoken }> = (props) => {
  const { t } = useTranslation('common', { keyPrefix: 'numbers' })
  return (
    <tr>
      <td>{props.value.shortName}</td>
      <td style={{ textAlign: 'right' }}>
        {t('currency', { value: props.value.value })}
      </td>
      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
        {t('percent', { value: props.value.annualPercentageYield })}
      </td>
      <td style={{ textAlign: 'right' }}>
        {t('decimal', { value: props.value.amount })}
      </td>
      <td style={{ textAlign: 'right' }}>
        {t('currency', {
          value: props.value.amount * props.value.netRentDayPerToken * 7,
        })}
      </td>
      <td style={{ textAlign: 'right' }}>
        {t('currency', {
          value: props.value.amount * props.value.netRentYearPerToken,
        })}
      </td>
      <td style={{ textAlign: 'right' }}>
        {t('decimal', { value: props.value.rentedUnits })}
        {' / '}
        {t('decimal', { value: props.value.totalUnits })}
        {` (${t('percentInteger', {
          value: (props.value.rentedUnits / props.value.totalUnits) * 100,
        })})`}
      </td>
      <td style={{ textAlign: 'right' }}>
        {t('currency', { value: props.value.totalInvestment })}
      </td>
    </tr>
  )
}
AssetTableRow.displayName = 'AssetTableRow'
