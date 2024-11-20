import React, { useState } from 'react';

interface SearchBarProps {
	placeholder?: string;
	onSearch: (query: string) => void;
	debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
	placeholder = 'Buscar...',
	onSearch,
	debounceTime = 10,
}) => {
	const [query, setQuery] = useState<string>('');

	// Manejador para eventos de cambio en el input
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);

		if (debounceTime) {
			debounce(() => onSearch(e.target.value), debounceTime);
		} else {
			onSearch(e.target.value);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSearch(query);
		}
	};

	let debounceTimer: NodeJS.Timeout;
	const debounce = (callback: () => void, delay: number) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, delay);
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
			<input
				type='text'
				value={query}
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				placeholder={placeholder}
				style={{
					padding: '8px',
					border: '1px solid #ccc',
					borderRadius: '4px',
					flex: 1,
				}}
			/>
			<button
				onClick={() => onSearch(query)}
				style={{
					padding: '8px 12px',
					border: 'none',
					backgroundColor: '#007bff',
					color: 'white',
					borderRadius: '4px',
					cursor: 'pointer',
				}}
			>
				Buscar
			</button>
		</div>
	);
};

export default SearchBar;
