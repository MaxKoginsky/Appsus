import { mailService } from "../apps/mail/services/mail-service.js"
import { eventBus } from "../services/event-bus.service.js"

export default {
  template: `
        <header class="app-header">
            <nav>
                <router-link to="/">Home</router-link> |
                <router-link :to="mailLink">Mail </router-link> | 
                <router-link to="/about">About</router-link>
            </nav>
        </header>
    `,
  data() {
    return {
      selectedTab: ''
    }
  },
  created() {
    eventBus.on('tab-changed', this.updateCurrTab)
    this.selectedTab = mailService.getSelectedTab();
  },
  methods: {
    updateCurrTab(tab) {
      this.selectedTab = tab
    }
  },
  computed: {
    mailLink() {
      return `/mail/${this.selectedTab}`
    }
  },
}
