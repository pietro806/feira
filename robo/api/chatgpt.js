import { ChatGPTAPI } from 'chatgpt'
import 'dotenv/config'

export async function example(pergunta) {
  const api = new ChatGPTAPI({
    apiKey: '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'
  })

  const res = await api.sendMessage(pergunta)
  
  return res.text
}
