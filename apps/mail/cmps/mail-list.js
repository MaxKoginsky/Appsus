import mailPreview from './mail-preview.js'

export default {
    props: ['mails'],
    template: `
        <section class="mails-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id" :class="mail.isRead? 'mail-read' : ''" >
                   
                    
                    <span class="mail-star" v-if="mail.isStarred" @click="updateStarred(mail)">&starf;</span>
                    <span class="mail-star" v-else @click="updateStarred(mail)">&star;</span>
                    <mail-preview :mail="mail"/>
                    <section class="actions">
                        <i class="fa fa-trash-o" aria-hidden="true" @click="remove(mail.id)"></i>
                        <i :v-if="mail.isRead" 
                           :class="mail.isRead? 'fa fa-envelope-o' : 'fa fa-envelope-open-o'" aria-hidden="true" 
                           @click="updateRead(mail)"></i>
                        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                    </section>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(mailId) {
            this.$emit('remove', mailId)
        },
        updateStarred(mailId) {
            this.$emit('updateStarred', mailId)
        },
        updateRead(mailId) {
            if (!mail.isRead) {
                mail.isRead = true
                this.$emit('updateRead', mailId)
            }
        },
        selectMail(mail) {
            this.$emit('selected', mail)
        },
    },
    components: {
        mailPreview,
    }
}
