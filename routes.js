import homePage from './views/HomePage.js'
import aboutPage from './views/AboutUs.js'
import mailApp from './apps/mail/pages/mail-index.js'
import mailInbox from './apps/mail/pages/mail-inbox.js'
import mailStarred from './apps/mail/pages/mails-starred.js'
import mailSent from './apps/mail/pages/mails-sent.js'
import mailDraft from './apps/mail/pages/mail-draft.js'
import mailDetails from './apps/mail/pages/mail-details.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
		},
		{
			path: '/about',
			component: aboutPage,
		},
		{
			path: '/mail',
			component: mailApp,
			children: [
				{
					path: ':id',
					component: mailDetails,
				},
				{
					path: 'inbox',
					component: mailInbox,
				},
				{
					path: 'starred',
					component: mailStarred,
				},
				{
					path: 'sent',
					component: mailSent,
				},
				{
					path: 'draft',
					component: mailDraft,
				}
			]
		},
	],
}

export const router = createRouter(routerOptions)
