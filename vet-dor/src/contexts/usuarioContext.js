'use client'

const { createContext, useState } = require(`react`);

export const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {
	const [ cpfUsuario, setCpfUsuario ] = useState('');

	return(
		<UsuarioContext.Provider value={{ cpfUsuario, setCpfUsuario }}>
			{children}
		</UsuarioContext.Provider>
	)
}
