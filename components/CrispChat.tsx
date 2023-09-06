'use client';

import { useEffect } from 'react';

import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
	useEffect(() => {
		Crisp.configure('57671d92-d50b-4786-b676-6d8c5c93be6e');
	}, []);

	return null;
};
