import { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { Button, Flex, MediaQuery, Stack, TextInput } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'

import { selectAddressList } from 'src/store/features/settings/settingsSelector'
import { addressListChanged } from 'src/store/features/settings/settingsSlice'

const WalletInput: FC<{
  label: string
  value: string
  onChange: (value: string) => void
}> = (props) => {
  return (
    <>
      <MediaQuery largerThan={'xs'} styles={{ display: 'none' }}>
        <TextInput
          label={props.label}
          value={props.value}
          size={'xs'}
          onChange={(event) => props.onChange(event.currentTarget.value)}
          style={{ width: '100%' }}
        />
      </MediaQuery>
      <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
        <TextInput
          label={props.label}
          value={props.value}
          onChange={(event) => props.onChange(event.currentTarget.value)}
          style={{ width: '100%' }}
        />
      </MediaQuery>
    </>
  )
}

export const ManageWalletModal: FC<ContextModalProps> = ({ context, id }) => {
  const { t } = useTranslation('common', { keyPrefix: 'walletModal' })

  const dispatch = useDispatch()
  const [addressList, setAddressList] = useState<string[]>(
    useSelector(selectAddressList)
  )

  const onClose = useCallback(() => {
    context.closeModal(id)
  }, [context, id])

  const onSubmit = () => {
    dispatch(addressListChanged(addressList))
    onClose()
  }

  return (
    <Stack
      justify={'center'}
      align={'center'}
      style={{ width: '500px', maxWidth: '100%' }}
    >
      <Flex direction={'column'} gap={'xs'} style={{ width: '100%' }}>
        <WalletInput
          label={t('address', { value: 1 })}
          value={addressList[0]}
          onChange={(value) => setAddressList([value, addressList[1]])}
        />
        <WalletInput
          label={t('address', { value: 2 })}
          value={addressList[1]}
          onChange={(value) => setAddressList([addressList[0], value])}
        />
      </Flex>
      <Flex gap={'lg'}>
        <Button onClick={onClose} variant={'subtle'}>
          {t('close')}
        </Button>
        <Button onClick={onSubmit}>{t('submit')}</Button>
      </Flex>
    </Stack>
  )
}