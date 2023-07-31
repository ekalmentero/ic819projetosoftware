<template>
    <div id="info">
        <h2>Localização e contato</h2>
        <main>
            <div id="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d412.5871754765532!2d-43.184862877115506!3d-22.951421313947204!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1683379519996!5m2!1spt-BR!2sbr"
                    height="200" style="border:0;" allowfullscreen="false" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div id="contact">
                <ul>
                    <li><img src="@/assets/img/icons/whatsapp.svg" alt="">
                        <p>+55 (21) 99999-9999</p>
                    </li>
                    <li><img src="@/assets/img/icons/clock.svg" alt="">
                        <p>Segunda a sexta de 8h às 18h</p>
                    </li>
                    <li><img src="@/assets/img/icons/email.svg" alt="">
                        <p>atendimento@puppyresort.com</p>
                    </li>
                    <li><img src="@/assets/img/icons/instagram.svg" alt="">
                        <p>@puppyresort</p>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
#info {
    background: #ffffff;
    padding: 2rem;

    @media screen and (min-width: 779px) {
        padding: 2rem 3rem;
    }

    h2 {
        margin-bottom: 1.5rem;
    }

    main {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        @media screen and (min-width: 779px) {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 5rem;
        }

        #map {
            @media screen and (min-width: 779px) {
                flex: 1;
            }

            iframe {
                min-width: 100%;

                @media screen and (min-width: 779px) {
                    min-height: 400px;
                }
            }
        }

        #contact {
            @media screen and (min-width: 779px) {
                flex: 1;
            }

            ul {
                list-style: none;
                padding: 0;
                display: flex;
                flex-direction: column;
                gap: 1rem;

                li {
                    display: flex;
                    align-items: center;
                    gap: 1rem;

                    @media screen and (min-width: 779px) {
                        font-size: 1.2rem;
                    }

                    img {
                        max-width: 1.2rem;

                        @media screen and (min-width: 779px) {
                            max-width: 1.5rem;
                        }
                    }
                }
            }
        }
    }
}
</style>