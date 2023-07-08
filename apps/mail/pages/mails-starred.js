import mailList from '../cmps/mail-list.js'

export default {
    props: ['currMails', 'selectedMail'],
    template: `
    <section class="mails starred mail-starred">
        <mail-list 
            v-if="starredMails"
            :mails="mailsUnread"
            @selected="selectMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
        <mail-list 
            v-if="starredMails"
            :mails="allMails"
            @selected="selectMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
    </section>
    `,
    data() {
        return {
            starredMails: null,
            currSelectedMail: null,
        }
    },
    created() {
        this.starredMails = this.currMails
        this.currSelectedMail = this.selectMail
    },
    methods: {
        removeMail(mailId) {
            this.$emit('remove', mailId)
        },
        selectMail(mail) {
            this.$emit('selected', mail)
        },
        updateStarStatus(mailId) {
            this.$emit('updateStarred', mailId)
        },
        updateReadStatus(mailId) {
            this.$emit('updateRead', mailId)
        },
    },
    computed: {
        mailsUnread() {
            return this.starredMails.filter(mail => mail.isRead === false && mail.isStarred === true).reverse()
        },
        allMails() {
            return this.starredMails.filter(mail => mail.isRead === true && mail.isStarred === true).reverse()
        },
    },
    watch: {
        currMails: {
            handler() {
                this.starredMails = this.currMails
            },
            deep: true
        }
    },
    components: {
        mailList,
    }
}
