import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from 'react';

import { TransactionsContext } from '../../../../contexts/TransactionsContext';

import { SearchFormContainer } from "./styles";

const searchFormSchema = zod.object({
	query: zod.string(),
});

type SearchFormInputs = zod.infer<typeof searchFormSchema>;

export function SearchForm() {
	const { fetchTransactions } = useContext(TransactionsContext);

	const { 
		register, 
		handleSubmit,
		formState: { isSubmitting }
	} = useForm<SearchFormInputs>({
		resolver: zodResolver(searchFormSchema)
	});

	async function handleSearchTransactions(data: SearchFormInputs) {
		await fetchTransactions(data.query)

		await new Promise(resolve => setTimeout(resolve, 2000))
		console.log(data)
	}

	return (
		<SearchFormContainer action="" onSubmit={handleSubmit(handleSearchTransactions)}>
			<input 
				type="text" 
				placeholder="Busque por transações" 
				{...register('query')}
			/>

			<button type="submit" disabled={isSubmitting}>
				<MagnifyingGlass size={20} />
				Buscar
			</button>
		</SearchFormContainer>
	);
}
