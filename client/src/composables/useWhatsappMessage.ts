export function useWhatsappMessage() {
  const sendWppMessage = () => {
    const phone = '5521981834355'
    const now = new Date().getHours()
    const greeting =
      now >= 5 && now < 12 ? 'Bom dia!' : now >= 12 && now < 18 ? 'Boa tarde!' : 'Boa noite!'
    const text = `${greeting} Eu gostaria de agendar uma hospedagem para o meu pet.`
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`)
  }

  return {
    sendWppMessage
  }
}
