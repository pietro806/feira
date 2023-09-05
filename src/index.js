import wppconnect from '@wppconnect-team/wppconnect'

import { ChatGPTAPI } from 'chatgpt'

import 'dotenv/config'

const api = new ChatGPTAPI({
    apiKey: process.env.KEY,
    completionParams: {
        model: 'gpt-3.5-turbo',
        temperature: 1.2,
      }
})

let resposta = await api.sendMessage("A partir de agora, se eu perguntar algo sobre o Instituto Social Nossa Senhora de Fátima (também conhecido como Frei) responda segundo as informações que estou te dando agora. O preço do salgado na cantina do Instituto é 5 reais. Dentro do instituto existem diversos cursos técnicos como informatica, secretariado, comunicação visual (CV), administração, eletromecanica e eletrotécnica. Todos os cursos tem a duração de um ano. o preço dos nossos salgados variam. O preço do salgado é 5 reais, enquanto o do salgado com calabresa é 6 reais. Os lanches como sonho ou trouxinhas são 4 reais, e ja o bolo de chocolate é 5 reais. Dentro do curso de informatica existem as matérias de software e hardware. Dentre as de software temos: modelagem de banco de dados, desenvolvimento web e também a matéria de lógica de programação. A matéria de modelagem é feita na linguagem mysql, a matéria de desenvolvimento web que é onde são usadas a linguagens HTML5, CSS3 e react.js, já na matéria de lógica de programação é usado javascript. E nas matérias de hardware temos, montagem e manutenção de computadores e Redes de computadores. Na matéria e montagem e manutenção de computadores vemos como funciona a montagem de um PC conhecendo todas as peças e componentes eletronicos, ja em redes, vemos como funciona o cabeamento estruturado e todo o funcionamento do compartilhamento de dados em uma rede de computadores. No curso de comunicação visual temos os conceitos fundamentais do design e fotografia, e também vemos sobre a prototipação de sites. No curso de eletromecanica, vemos muito sobre todo o funcionamento de veiculo mecanico sendo ele moto, carro, caminhão e entre outros. No curso de eletrotécnica vemos sobre os circuitos elétricos e como manipula-los, até mesmo criando automações para tarefas simples");
console.log(resposta);


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
                
                resposta = await api.sendMessage(message.body, {
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
                    }, parentMessageId: resposta.id
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








