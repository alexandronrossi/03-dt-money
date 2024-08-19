import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import { NewTransactionModal } from '../NewTransactionModal';

import logoImg from '../../assets/logo.svg'

export function Header() {
	return (
	  <HeaderContainer>
		<HeaderContent>
			<img src={logoImg} alt="" />
			<AlertDialog.Root>
				<AlertDialog.Trigger asChild>
					<NewTransactionButton >Nova transação</NewTransactionButton>
				</AlertDialog.Trigger>

				<NewTransactionModal />
			</AlertDialog.Root>
		</HeaderContent>
	  </HeaderContainer>
	)
}

