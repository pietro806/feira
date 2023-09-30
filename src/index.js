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

let resposta = await api.sendMessage('A partir de agora, se eu perguntar algo sobre o Instituto Social Nossa Senhora de Fátima (também conhecido como Frei) responda segundo as informações que estou te dando agora. Também tente ser o mais breve possível ao me responder. Dentro do instituto existem diversos cursos técnicos como informatica, secretariado, comunicação visual (CV), administração, eletromecanica e eletrotécnica. Todos os cursos técnicos têm a duração de um ano, enquanto o curso de Inglês é dividido em níveis, do básico ao avançado, e cada nível tem a duração de um ano. O preço dos nossos salgados variam. O preço da maioria dos salgados é de 6 reais. Os doces como sonho ou trouxinhas são 4 reais, e ja o bolo de chocolate é 5 reais. Dentro do curso de informática existem as matérias de software e hardware. Dentre as de software temos: modelagem de banco de dados, desenvolvimento web e também a matéria de lógica de programação. A matéria de modelagem é feita na linguagem mysql, a matéria de desenvolvimento web que é onde são usadas a linguagens HTML5, CSS3 e React.js, já na matéria de lógica de programação é usado javascript. E nas matérias de hardware temos, montagem e manutenção de computadores e Redes de computadores. Na matéria e montagem e manutenção de computadores vemos como funciona a montagem de um PC conhecendo todas as peças e componentes eletronicos; já em redes, vemos como funciona o cabeamento estruturado e todo o funcionamento do compartilhamento de dados em uma rede de computadores. No curso de comunicação visual temos os conceitos fundamentais do design e fotografia, e também vemos sobre a prototipação de sites. No curso de eletromecânica, vemos muito sobre todo o funcionamento de veiculo mecânico, seu motor e componentes, seja moto, carro, caminhão e entre outros. No curso de eletrotécnica vemos sobre os circuitos elétricos e como manipulá-los, até mesmo criando automações para tarefas simples. A criação do Instituto faz parte de um grande projeto chamado Ação Social, e a Ação Social teve seu início em 1970, com a vinda de um frade franciscano, oriundo da Itália, chamado de Frate Severino, conhecido carinhosamente no Brasil como Frei Xavier. Sua primeira obra foi construir uma igreja e integrar a comunidade em torno dos princípios da fé católica. Com esse convívio, começaram a brotar idéias, na direção de uma Ação Social Nossa Senhora de Fátima, com o grande objetivo de ajudar os jovens mais carentes da região. A Ação Social divide-se em vários grupos de atividades, todas no sentido de assistir a comunidade, tendo como pilastra o Ser Humano desde a infância, seguindo com a juventude, na preparação do Caminho para Maioridade (Cidadania). O grande enfoque na estratégia empregada pelo Frei Xavier junto a Ação Social desde a sua fundação, é criar as condições intelectuais, profissionais, morais e religiosas, no sentido de preparar as crianças e os jovens para uma vida melhor e mais feliz, contribuindo desta forma para uma sociedade mais justa.');

wppconnect.create({
    session: 'whatsbot', 
    autoClose: false, 
    puppeteerOptions: { args: ['--no-sandbox'] }
})

.then((client) => 

    client.onMessage((message) => {

        if (!message.isGroupMsg && message.from === '554797005802@c.us') {
            Chat()
        }
            async function Chat() {
                let respostaParcial = '';
                
                resposta = await api.sendMessage(message.body, {
                    onProgress: (partialResponse) => {

                        if(partialResponse.delta != undefined)
                        {
                            respostaParcial = respostaParcial + partialResponse.delta;
                        }

                        if(partialResponse.text.charAt(partialResponse.text.length - 1) == '\n' || partialResponse.delta === undefined)
                        {
                            client.sendText(message.from, respostaParcial.trim());
                            console.log(respostaParcial.trim());
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








