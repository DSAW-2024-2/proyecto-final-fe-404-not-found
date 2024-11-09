export const fetchProfileData = async (
	endpoint: string,
	setErrorMessage: (message: string | null) => void
) => {
	const url = `${localStorage.getItem('API')}/${endpoint}`;
	const token = localStorage.getItem('token');

	try {
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Server responded with status: ${response.status}`);
		}

		const contentType = response.headers.get('content-type');
		if (contentType && contentType.includes('application/json')) {
			const data = await response.json();
			return data;
		} else {
			throw new Error(
				'Expected JSON response but received a different format.'
			);
		}
	} catch (error) {
		console.error('Error fetching profile data:', error);
		setErrorMessage('Failed to load profile data. Please try again later.');
		return null;
	}
};
