import mailList from '../cmps/Maillist.js'

export default {
    props: ['currMails', 'selectedMail'], 
    template: `
    <section class="mails mail-draft">
        <mail-list 
            v-if="draftMails"
            :mails="allMails"
            @selected="selectMail" 
            @updateStarred="updateStarStatus"
            @updateRead="updateReadStatus"
            @remove="removeMail" />
    </section>
    `,
     data() {
        return {
            draftMails: null,
            currSelectedMail: null,
        }
    },
    created() {
        this.draftMails = this.currMails
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
        allMails() {
            return this.draftMails.filter(mail => mail.status === "draft").reverse()
        },
    },
    watch: {
        currMails:{
            handler(){
                this.draftMails = this.currMails
            },
            deep: true
        }
    },
    components: {
        mailList,
    }
}
