import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { X } from 'phosphor-react';

import { CancelButton, Content, Overlay } from './styles'

export function NewTransactionModal() {
  return (
	<AlertDialog.Portal>
		<Overlay />
		<Content>
			<AlertDialog.Title>Nova Transação</AlertDialog.Title>

			<CancelButton>
				<X size={24} />
			</CancelButton>

			<form action="">
				<input type="text" placeholder='Descrição' required />
				<input type="number" placeholder='Preço' required />
				<input type="text" placeholder='Categoria' required />

				<button type="submit">Cadastrar</button>
			</form>
		</Content>
	</AlertDialog.Portal>
  )
}
