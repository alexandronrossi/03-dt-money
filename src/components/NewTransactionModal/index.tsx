import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';

import { CancelButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'

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

				<TransactionType>
					<TransactionTypeButton variant='income'>
						<ArrowCircleUp size={24} />
						Entrada
					</TransactionTypeButton>

					<TransactionTypeButton variant='outcome'>
						<ArrowCircleDown size={24} />
						Saída
					</TransactionTypeButton>
				</TransactionType>

				<button type="submit">Cadastrar</button>
			</form>
		</Content>
	</AlertDialog.Portal>
  )
}
