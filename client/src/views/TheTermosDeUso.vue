<template>
    <div id="container">
        <div class="content">
            <h2>Termos de Uso e Serviço da Empresa de Hospedagem de Pets Domésticos</h2>

            <h3>1. Reserva e Pagamento:</h3>
            <article>

                <p>1.1 Ao utilizar nossos serviços de hospedagem, será cobrada uma taxa fixa de R$70 por dia de hospedagem.
                </p>
                <p>1.2 As reservas devem ser feitas com antecedência, e a confirmação está sujeita à disponibilidade de
                    vagas.</p>
                <p>1.3 O pagamento deve ser realizado no momento do agendamento online e é não reembolsável em caso de cancelamento por
                    parte
                    do cliente. No entanto, caso a empresa precise cancelar a reserva, o cliente será reembolsado
                    integralmente.</p>
            </article>

            <h3>2. Posse do Animal:</h3>
            <article>

                <p>2.1 O cliente deve comprovar a posse legal do animal a ser hospedado, apresentando documentos que atestem
                    a sua
                    responsabilidade sobre o pet.</p>
                <p>2.2 Ao deixar o animal sob os cuidados da empresa, o cliente autoriza a hospedagem temporária do mesmo,
                    concordando que ele será tratado com o máximo de carinho e respeito.</p>
                <p>2.3 A empresa não se responsabiliza por qualquer dano, perda ou fuga do animal durante o período de
                    hospedagem.
                </p>
            </article>

            <h3>3. Cuidados Veterinários:</h3>
            <article>

                <p>3.1 O cliente deve fornecer todas as informações relevantes sobre a saúde e comportamento do animal antes
                    da
                    hospedagem, incluindo histórico médico e contatos do veterinário responsável.</p>
                <p>3.2 Caso o animal necessite de cuidados veterinários durante a hospedagem, a empresa fará o possível para
                    contatar o veterinário de referência do pet. O cliente arcará com quaisquer custos associados aos
                    tratamentos
                    médicos necessários.</p>
                <p>3.3 A empresa possui funcionários treinados para lidar com emergências de saúde, mas não se
                    responsabiliza por
                    eventuais complicações de saúde que o animal já possua antes da hospedagem.</p>
            </article>

            <h3>4. Vacinação e Vermifugação:</h3>
            <article>

                <p>4.1 O cliente é responsável por garantir que o animal esteja devidamente vacinado e vermifugado antes da
                    hospedagem. Será exigida a apresentação do cartão de vacinação atualizado no momento do check-in.</p>
                <p>4.2 Caso o animal esteja com a vacinação ou vermifugação desatualizadas, a empresa poderá recusar a
                    hospedagem.
                </p>
            </article>

            <h3>5. Comportamento do Animal:</h3>
            <article>

                <p>5.1 O cliente é responsável por garantir que o animal tenha um comportamento adequado, não representando
                    perigo
                    para outros animais ou funcionários da empresa.</p>
                <p>5.2 Caso o animal demonstre comportamento agressivo ou hostil, a empresa reserva-se o direito de recusar
                    a
                    hospedagem ou aplicar medidas de segurança adequadas.</p>
            </article>

            <h3>6. Objetos Pessoais:</h3>
            <article>

                <p>6.1 O cliente deve fornecer todos os itens necessários para o bem-estar do animal durante a hospedagem,
                    incluindo
                    comida, coleira, caminha e brinquedos.</p>
                <p>6.2 A empresa não se responsabiliza por quaisquer danos ou perdas de objetos pessoais do animal deixados
                    nas
                    dependências da empresa.</p>

                <p>Ao utilizar nossos serviços de hospedagem, você concorda com estes termos e reconhece que leu e
                    compreendeu todas
                    as condições aqui estabelecidas. A empresa reserva-se o direito de modificar estes termos de uso a
                    qualquer
                    momento, mediante aviso prévio aos clientes. Caso tenha alguma dúvida ou preocupação, não hesite em
                    entrar em
                    contato conosco. Agradecemos a confiança depositada em nossos serviços e estamos ansiosos para cuidar do
                    seu pet
                    com carinho e responsabilidade!</p>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
#container {
    min-height: 90vh;
    padding: 1rem 2rem 7rem;
    gap: 1.5rem;
    position: relative;

    .content {
        text-align: left;

        p {
            word-wrap: break-word;
        }

        h2,
        h3 {
            color: var(--primary-color);
        }
        
        h2, article {
            margin-bottom: 1em;
        }

        h3 {
            margin-bottom: .5em;
        }
    }
}</style>