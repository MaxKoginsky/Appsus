import { eventBus } from '../services/event-bus.service.js'

export default {
  template: `
        <section :class="msg.type" v-if="msg.txt" class="user-msg">
			  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/OOjs_UI_icon_alert-yellow.svg/1024px-OOjs_UI_icon_alert-yellow.svg.png" alt="">
			<br>
            {{ msg.txt }}
        </section>
    `,
  data() {
    return {
      msg: { txt: '', type: 'success' },
    }
  },
  created() {
    eventBus.on('show-msg', this.showMsg)
  },
  methods: {
    showMsg(msg) {
      this.msg = msg
      setTimeout(() => (this.msg.txt = ''), this.msg.timeout || 2000)
    },
  },
}
