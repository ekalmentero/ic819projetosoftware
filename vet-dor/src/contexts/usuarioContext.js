const { createContext, useState } = require(`react`);

const usuarioContext = createContext(null);

function usuarioProvider({ children }) {
	const [ cpfUsuario, setCpfUsuario ] = useState(null);

	return (
		<usuarioContext.Provider value={[ cpfUsuario, setCpfUsuario ]}>
			{children}
		</usuarioContext.Provider>
	)
}

export default usuarioProvider;