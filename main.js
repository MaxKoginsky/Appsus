const { createApp } = Vue

import { router } from './routes.js'

import appHeader from './cmps/AppHeadr.js'
import appFooter from './cmps/AppFooter.js'
import userMsg from './cmps/UserMsg.js'

const options = {
    template: `
        <section class="main">
            <app-header />
            <router-view />
            <app-footer />
            <user-msg />
        </section>
    `,
    components: {
        appHeader,
        appFooter,
        userMsg,
    },
}

const app = createApp(options)
app.use(router)
app.mount('#app')
