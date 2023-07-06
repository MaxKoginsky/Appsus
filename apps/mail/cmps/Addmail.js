import { eventBus } from "../../../services/event-bus.service.js"

export default {
  props: ["isOpen"],
  template: `
        <section class="new-mail">
            <div class="title">
                New Message
                <p class="close-btn" @click="closeNewMail">X</p>
            </div>
            <label class="mail-to">
                To
                <input class="mail-input" type="email" :v-modal="recipient" :ref="recipient" @input="updateRecipient"/>
            </label>
            <hr>
            <input class="mail-input" type="text" placeholder="Subject" :v-modal="subject" :ref="subject" @input="updateSubject"/>
            <hr>
            <textarea class="mail-body" :v-modal="body" :ref="body" @input="updateBody"></textarea>
            <button class="send-btn" @click="sendMail">Send</button>
        </section>
    `,
  data() {
    return {
      recipient: "",
      subject: "",
      body: "",
    };
  },
  created() {},
  methods: {
    closeNewMail() {
      this.$emit("closeNewMail")
    },
    sendMail() {
      const mail = {
        status: "sent",
        subject: this.subject,
        body: this.body,
        isRead: false,
        isStarred: false,
        sentAt: Math.floor(Date.now() / 1000),
        to: 
          { 
            email: this.recipient,
            fullname: this.recipient.slice(0, this.recipient.indexOf('@'))
        },
      };
      this.$emit("closeNewMail")
      eventBus.emit('add-mail', mail)
      this.recipient = ''
      this.subject = ''
      this.body = ''
    },
    updateSubject(ev) {
        this.subject = ev.target.value
    },
    updateRecipient(ev) {
        this.recipient = ev.target.value
    },
    updateBody(ev) {
        this.body = ev.target.value
    }
  },
}
