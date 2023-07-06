import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['selectedTab', 'isModalOpen'],
    template: `
        <section class="menu">
            <div class="mail-menu" :class="isOpen? 'menu-open' : 'menu-close'">
                <div class="menu-header">
                    <button class="menu-compose" @click="openNewMail">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                        <p>Compose</p>
                    </button>
                    <i @click="closeModal" class="fa fa-times btn-close" aria-hidden="true"></i>
                </div>
                <ul>
                    <li class="menu-tab" :class="tab === 'Inbox' ? 'is-selected' : ''" @click="updateSelectedTab">
                        <i class="fa fa-inbox" aria-hidden="true"></i>
                        <p>Inbox</p>
                    </li>
                    <li class="menu-tab" :class="tab === 'Starred' ? 'is-selected' : ''" @click="updateSelectedTab">
                        <i class="fa fa-star-o" aria-hidden="true"></i>
                        <p>Starred</p>
                    </li>
                    <li class="menu-tab" :class="tab === 'Sent' ? 'is-selected' : ''" @click="updateSelectedTab">
                        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                        <p>Sent</p>
                    </li>
                </ul>
            </div>
        </section>
    `,
    data() {
        return {
            tab: 'Inbox',
            isOpen: false
        }
    },
    created() {
        this.tab = this.selectedTab
        this.isOpen = this.isModalOpen
    },
    methods: {
        updateSelectedTab(ev){
            this.tab = ev.target.innerText
            this.$router.push(`/mail/${ev.target.innerText.toLowerCase()}`)
            this.$emit('updateTab', this.tab)
            eventBus.emit('tab-changed', this.tab)
            this.closeModal()
        },
        openNewMail() {
            this.$emit('openNewMail')
            this.closeModal()
        },
        closeModal() {
            this.isOpen = false
        }
    },
    watch: {
        isModalOpen:{
            handler(){
                this.isOpen = this.isModalOpen
            },
            deep: true
        }
    }
}
