import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";


interface Transaction {
	id: number;
	description: string;
	type: "income" | "outcome";
	category: string;
	price: number;
	createdAt: string;
}

interface CreateTransactionInput {
	description: string;
	price: number;
	category: string;
	type: 'income' | 'outcome';
}

interface TransactionsContextType {
	transactions: Transaction[];
	fetchTransactions: (query?: string) => Promise<void>;
	createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps {
	children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	async function fetchTransactions(query?: string) {
		const response = await api.get('/transactions', {
			params: {
				_sort: 'createdAt',
				_order: 'desc',
				q: query,
			}
		});
		setTransactions(response.data);
	}

	async function createTransaction({description, price, category, type}: CreateTransactionInput) {
		const response = await api.post('/transactions', {
			description,
			price,
			category,
			type,
			createdAt: new Date(),
		});

		setTransactions((state) => [...state, response.data])
	}

	useEffect(() => {
		fetchTransactions();
	}, []);

	return (
		<TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
			{children}
		</TransactionsContext.Provider>
	);
}
