import { mailService } from "../services/mail-service.js"
import mailFilter from "../cmps/Mailfilter.js"
import mailMenu from "../cmps/MailMenu.js"
import addMail from "../cmps/Addmail.js"

export default {
  template: `
    <section class="main-mail-app">
        <mail-filter 
            :selectedTab="selectedTab"
            @updateModal="updateMenuModal" 
            @filterBySearch="filterBySearch"
        />
        <div class="mail-app">
            <mail-menu @openNewMail="openModal" :selectedTab="selectedTab" @updateTab="setTab" :isModalOpen="isModalOpen"/>
            <section class="mail-view">
                <router-view  
                    v-if="mails"
                    :currMails="getMails"
                    @selected="selectMail" 
                    @updateStarred="updateStarStatus"
                    @updateRead="updateReadStatus"
                    @remove="removeMail"
                    @load="loadMails"
                    @add="addMail"
                />
            </section>
            <add-mail :class="isMenuModalOpen" :isOpen="isNewMailOpen" @closeNewMail="closeModal"/>
        </div>
    </section>
    `,
  data() {
    return {
      isNewMailOpen: false,
      isModalOpen: false,
      selectedTab: "Inbox",
      mails: null,
      allMails: null,
      selectedMail: null,
      filteredBy: {
        isUnread: false,

  },
      isUnreadOn: false,
    }
  },
  created() {
    mailService.query().then((resMails) => {
      this.allMails = resMails
    })
    this.loadMails()
    this.selectedTab = mailService.getSelectedTab()
  },
  methods: {
    loadMails() {
      mailService.query().then((resMails) => {
        this.mails = resMails
      })
    },

    filterBySearch(searchValue) {
      this.mails = this.allMails
      this.mails = this.mails.filter(
        (mail) =>
          mail.subject.includes(searchValue) ||
          mail.from.email.includes(searchValue) ||
          mail.from.fullname.includes(searchValue) ||
          mail.to.email.includes(searchValue) ||
          mail.to.fullname.includes(searchValue)
      )
    },
    addMail(payload) {
      mailService.addNewMail(payload).then((mail) => {
        this.mails.push(mail)
        this.loadMails()
      })
    },
    removeMail(mailId) {
      mailService.remove(mailId).then(() => {
        const idx = this.mails.findIndex((mails) => mails.id === mailId)
        this.mails.splice(idx, 1)
        this.loadMails()
      })
    },
    selectMail(mail) {
      this.selectedMail = mail
    },
    updateStarStatus(mail) {
      mailService
        .updateIsStarred(mail)
        .then((mail) => (this.selectedMail = mail))
    },
    updateReadStatus(mail) {
      mailService.updateIsRead(mail).then((mail) => (this.selectedMail = mail))
    },
  },
  computed: {
    getBtnUnreadClass() {
        return this.filteredBy.isUnread ? 'btn-unread-on' : ''
    },
    getMails() {
      return this.mails;
    },
    isMenuModalOpen() {
      return this.isNewMailOpen ? "modal-open" : "modal-close"
    },
  },
  components: {
    mailFilter,
    mailMenu,
    addMail,
  },
}
