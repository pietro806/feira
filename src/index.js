import wppconnect from '@wppconnect-team/wppconnect'

import { ChatGPTAPI } from 'chatgpt'

import 'dotenv/config'

const api = new ChatGPTAPI({
    apiKey: process.env.KEY,
    completionParams: {
        model: 'gpt-3.5-turbo',
        temperature: 1,
      }
})

wppconnect.create({
    session: 'whatsbot', 
    autoClose: false, 
    puppeteerOptions: { args: ['--no-sandbox'] }
})

.then((client) => 

    client.onMessage((message) => {

        if (!message.isGroupMsg)
            Chat()

            async function Chat() {
                let respostaParcial = '';
                
                await api.sendMessage(message.body, {
                    onProgress: (partialResponse) => {
                        console.log(respostaParcial);

                        if(partialResponse.delta != undefined)
                        {
                            respostaParcial = respostaParcial + partialResponse.delta;
                        }

                        if(partialResponse.text.charAt(partialResponse.text.length - 1) == '\n' || partialResponse.delta === undefined)
                        {
                            client.sendText(message.from, respostaParcial.trim());
                            respostaParcial = '';
                        }
                    }
                })

            if(respostaParcial)
                client.sendText(message.from, respostaParcial)
            
            .then((result) => {
                console.log('Pong retornado: ', result)
            })
            
            .catch((erro) => {
                console.log('erro: ', erro)
            })
        }
    })
        
)

.catch((error) => {
    console.log(error)
})