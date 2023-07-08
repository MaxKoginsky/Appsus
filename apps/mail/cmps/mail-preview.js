export default {
    props: ['mail'],
    template: `
        <router-link :to="mail.id" @click="markAsRead">
            <section class="mail-preview" :class="isRead">
                <p class="mail-subject">{{ getFullname }}</p>
                <p class="mail-body">{{ mail.subject }}</p>
                <p class="mail-date">{{ sentAt }}</p>
            </section>
        </router-link>
    `,
    computed: {
        getRoute() {
            return this.$route.fullPath + '/'
        },
        getFullname() {
            return this.mail.status === 'sent' ? 'To:' + this.mail.to.fullname : this.mail.from.fullname
        },
        isRead() {
            return this.mail.isRead ? 'read' : 'not-read'
        },
        sentAt() {
            var timestamp = this.mail.sentAt
            var timestamp_ms = timestamp * 1000
            var d_obj = new Date(timestamp_ms)
            var date = ("0" + d_obj.getDate()).slice(-2)
            var yr = d_obj.getFullYear()
            var mth = ("0" + (d_obj.getMonth() + 1)).slice(-2)

            return `${date}/${mth}/${yr}`
        },
    },
    methods: {
        markAsRead() {
            if (!this.mail.isRead) {
                this.mail.isRead = true
                this.$emit('updateRead', this.mail.id)
            }
        },
    },
}
