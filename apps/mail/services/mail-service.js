import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const MAIL_KEY = "mailDB"
const MENU_SELECTED_TAB_KEY = "selectedTabDB"

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
}

_createMails()

export const mailService = {
  query,
  remove,
  get,
  updateIsRead,
  updateIsStarred,
  addNewMail,
  getSelectedTab,
  setSelectedTab,
}

function query() {
  return storageService.query(MAIL_KEY)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function update(mail) {
  return storageService.put(MAIL_KEY, mail)
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  let selectedTab = utilService.loadFromStorage(MENU_SELECTED_TAB_KEY)
  if (!mails || !mails.length) {
    mails = getMails()
    utilService.saveToStorage(MAIL_KEY, mails)
  }

  if (!selectedTab) {
    selectedTab = 'Inbox'
    utilService.saveToStorage(MENU_SELECTED_TAB_KEY, selectedTab)
  }

  return mails
}

function getSelectedTab() {
  return utilService.loadFromStorage(MENU_SELECTED_TAB_KEY)
}

function setSelectedTab(selectedTab) {
  utilService.saveToStorage(MENU_SELECTED_TAB_KEY, selectedTab)
}

function getMails() {
  const currentDate = new Date()

  const mails = [
    {
      id: "e101",
      status: "inbox",
      subject: "hola",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      isRead: true,
      isStarred: false,
      sentAt: currentDate.getTime() / 1000,
      from: {
        email: "person1@gmail.com",
        fullname: "person1",
      },
      to: loggedinUser
    },
    {
      id: "e102",
      status: "inbox",
      subject: "shalom",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      isRead: true,
      isStarred: false,
      sentAt: currentDate.getTime() / 1000,
      from: {
        email: "person2@gmail.com",
        fullname: "person2",
      },
      to: loggedinUser
    },
    {
      id: "e103",
      status: "inbox",
      subject: "hello",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      isRead: false,
      isStarred: true,
      sentAt: currentDate.getTime() / 1000,
      from: {
        email: "person3@gmail.com",
        fullname: "person3",
      },
      to: loggedinUser
    },
    {
      id: "e104",
      status: "inbox",
      subject: "Konnichiwa",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      isRead: false,
      isStarred: false,
      sentAt: currentDate.getTime() / 1000,
      from: {
        email: "person4@gmail.com",
        fullname: "person4",
      },
      to: loggedinUser
    },
    {
      id: "e105",
      status: "inbox",
      subject: "hola",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      isRead: true,
      isStarred: false,
      sentAt: currentDate.getTime() / 1000,
      from: {
        email: "person1@gmail.com",
        fullname: "person1",
      },
      to: loggedinUser
    },
    {
      id: "e106",
      status: "inbox",
      subject: "shalom",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      isRead: true,
      isStarred: false,
      sentAt: currentDate.getTime() / 1000,
      from: {
        email: "person2@gmail.com",
        fullname: "person2",
      },
      to: loggedinUser
    },
    {
      id: "e107",
      status: "inbox",
      subject: "hello",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      isRead: false,
      isStarred: true,
      sentAt: currentDate.getTime() / 1000,
      from: {
        email: "person3@gmail.com",
        fullname: "person3",
      },
      to: loggedinUser
    },
    {
      id: "e108",
      status: "inbox",
      subject: "Konnichiwa",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      isRead: false,
      isStarred: false,
      sentAt: currentDate.getTime() / 1000,
      from: {
        email: "person4@gmail.com",
        fullname: "person4",
      },
      to: loggedinUser
    },
  ]
  return mails
}

function addNewMail(mail) {
  mail.id = utilService.makeId()
  mail.from = loggedinUser
  return storageService.post(MAIL_KEY, mail)
}

function updateIsStarred(mail) {
  mail.isStarred = !mail.isStarred
  return update(mail)
}

function updateIsRead(mail) {
  mail.isRead = !mail.isRead
  return update(mail)
}

