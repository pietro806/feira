export async function respostaGPT(api, pergunta) {
  const res = await api.sendMessage(pergunta)

  return res.text
}
