export const fetchProfileData = async (
	type: 'user' | 'car',
	setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
) => {
	const token = localStorage.getItem('token');
	if (!token) {
		setErrorMessage('Token not found. Please sign in.');
		return null;
	}

	const url = `${localStorage.getItem('API')}/${type}`;
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			setErrorMessage(
				`Error fetching ${type} data: ${errorData.message || response.statusText}`
			);
			return null;
		}

		return await response.json();
	} catch (error) {
		if (error instanceof Error) {
			setErrorMessage(`Error fetching ${type} data: ${error.message}`);
		} else {
			setErrorMessage(`Error fetching ${type} data: Unknown error`);
		}
		return null;
	}
};
