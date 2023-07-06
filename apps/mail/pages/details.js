import { mailService } from '../services/mail-service.js'

export default {
    template: `
        <section v-if="mail" class="mail-details">
            <router-link :to="relocateTo">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </router-link>
            <div class="mail-details-info">
                <h2 class="mail-details-subject">{{ mail.subject }}</h2>
                <p class="mail-details-from">{{ mail.from.fullname }} &lt;{{ mail.from.email }}&gt;</p>
                <div class="mail-details-to">
                    <p class="mail-details-from">to &lt;{{ mail.to.email }}&gt;</p>
                    <p>{{ sentAt }}</p></div>
                <hr />
                <p>{{ mail.body }}</p>
            </div>
        </section>
    `,
    data() {
        return {
            mail: null,
        }
    },
    created() {
        const id = this.$route.params.id
        mailService.get(id)
            .then(mail => {
                this.mail = mail
            })
    },
    computed: {
        relocateTo() {
            return this.$route.fullPath.slice(0, this.$route.fullPath.length - this.$route.params.id.length - 1) +
             '/' + 
             mailService.getSelectedTab()
        },
        sentAt() {
            var timestamp = this.mail.sentAt;
            var timestamp_ms = timestamp * 1000
            var d_obj = new Date(timestamp_ms)
            var date = ("0" + d_obj.getDate()).slice(-2)
            var hrs = ("0" + d_obj.getHours()).slice(-2)
            var mins = ("0" + d_obj.getMinutes()).slice(-2)
            var sec = ("0" + d_obj.getSeconds()).slice(-2)
            var yr = d_obj.getFullYear()
            var mth = ("0" + (d_obj.getMonth() + 1)).slice(-2)

            return `${date}/${mth}/${yr} ${hrs}:${mins}:${sec}`
        },
    },
}
