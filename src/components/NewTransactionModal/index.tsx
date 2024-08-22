import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as zod from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	CancelButton,
	Content,
	Overlay,
	TransactionType,
	TransactionTypeButton,
} from "./styles";

const newTransactionFormSchema = zod.object({
	description: zod.string(),
	price: zod.number(),
	category: zod.string(),
	type: zod.enum(["income", "outcome"]),
});

type newTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<newTransactionFormInputs>({
		resolver: zodResolver(newTransactionFormSchema),
		defaultValues: {
			type: 'income'
		}
	});

	async function handleCreateNewTransaction(data: newTransactionFormInputs) {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log(data);
	}

	return (
		<AlertDialog.Portal>
			<Overlay />
			<Content>
				<AlertDialog.Title>Nova Transação</AlertDialog.Title>

				<CancelButton>
					<X size={24} />
				</CancelButton>

				<form
					action=""
					onSubmit={handleSubmit(handleCreateNewTransaction)}
				>
					<input
						type="text"
						placeholder="Descrição"
						required
						{...register("description")}
					/>
					<input
						type="number"
						placeholder="Preço"
						required
						{...register("price", { valueAsNumber: true })}
					/>
					<input
						type="text"
						placeholder="Categoria"
						required
						{...register("category")}
					/>

					<Controller
						control={control}
						name="type"
						render={({ field }) => {
							return (
								<TransactionType onValueChange={field.onChange} value={field.value}>
									<TransactionTypeButton
										variant="income"
										value="income"
									>
										<ArrowCircleUp size={24} />
										Entrada
									</TransactionTypeButton>

									<TransactionTypeButton
										variant="outcome"
										value="outcome"
									>
										<ArrowCircleDown size={24} />
										Saída
									</TransactionTypeButton>
								</TransactionType>
							);
						}}
					/>

					<button type="submit" disabled={isSubmitting}>
						Cadastrar
					</button>
				</form>
			</Content>
		</AlertDialog.Portal>
	);
}
