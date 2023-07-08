import mailList from '../cmps/mail-list.js'

export default {
    props: ['currMails', 'selectedMail'],
    template: `
    <section class="mails mail-inbox" v-if="inboxMails">
        <div class = "mail-list">
        <mail-list 
            v-if="inboxMails"
            :mails="mailsUnread"
            @selected="currSelectedMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
        <mail-list 
            v-if="inboxMails"
            :mails="allMails"
            @selected="currSelectedMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
        </div>
    </section>
    `,
    data() {
        return {
            inboxMails: null,
            currSelectedMail: null,
        }
    },
    created() {
        this.inboxMails = this.currMails
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
            return this.inboxMails.filter(mail => mail.isRead === false && mail.status === "inbox").reverse()
        },
        allMails() {
            return this.inboxMails.filter(mail => mail.isRead === true && mail.status === "inbox").reverse()
        },
    },
    watch: {
        currMails: {
            handler() {
                this.inboxMails = this.currMails
            },
            deep: true
        }
    },
    components: {
        mailList,
    }
}
