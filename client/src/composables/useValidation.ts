import { ref } from 'vue'

export function useValidation() {
  const cpfError = ref('')
  const passwordError = ref('')
  const confPasswordError = ref('')
  const emailError = ref('')
  const nameError = ref('')

  const validateFullName = (name: string) => {
    if (!name) {
        nameError.value = 'Este campo é obrigatório.'
        return
    }
    const regex = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
    if (!regex.test(name)) {
      nameError.value = 'Por favor, digite seu nome completo.'
      return
    }
    nameError.value = ''
  }

  const validateEmail = (email: string) => {
    if (!email) {
        emailError.value = 'Este campo é obrigatório.'
        return
    }
    const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!regex.test(email)) {
      emailError.value = 'E-mail inválido.'
      return
    }
    emailError.value = ''
  }

  const validatePassword = (password: string) => {
    if (!password) {
        passwordError.value = 'Este campo é obrigatório.'
        return;
    }
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (!regex.test(password)) {
      passwordError.value =
        'Sua senha deve conter pelo menos 8 caracteres, além de números, letras maiúsculas e minúsculas.'
      return
    }
    passwordError.value = ''
  }

  const validateConfPassword = (password: string, confPassword: string) => {
    if (!confPassword) {
        confPasswordError.value = 'Este campo é obrigatório.'
        return;
    }
    if (password !== confPassword) {
      confPasswordError.value = 'As senhas não coincidem.'
      return
    }
    confPasswordError.value = ''
  }

  const validateCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf === '') {
      cpfError.value = 'Este campo é obrigatório.'
      return
    }
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      cpfError.value = 'CPF inválido.'
      return
    }
    // Valida 1o digito
    let add = 0
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)
    let rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) rev = 0
    if (rev != parseInt(cpf.charAt(9))) {
      cpfError.value = 'CPF inválido'
      return
    }
    // Valida 2o digito
    add = 0
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
    rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) rev = 0
    if (rev != parseInt(cpf.charAt(10))) {
      cpfError.value = 'CPF inválido'
      return
    }
    cpfError.value = ''
  }

  return {
    validateEmail,
    validatePassword,
    validateConfPassword,
    validateCPF,
    validateFullName,
    nameError,
    cpfError,
    passwordError,
    confPasswordError,
    emailError
  }
}
