import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id      : 'pages',
        title   : 'Pages',
        type    : 'group',
        icon    : 'pages',
        children: [
            {
                id: 'task',
                title: 'Task',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'alltask',
                        title: 'All Task',
                        type: 'item',
                        url: '/task/alltask'
                    },
                    {
                        id: 'mytask',
                        title: 'My Tasks',
                        type: 'item',
                        url: '/task/mytask'
                    },
                    {
                        id: 'complete',
                        title: 'Completed Tasks',
                        type: 'item',
                        url: '/task/complete'
                    },
                    {
                        id: 'hiddentask',
                        title: 'Hidden',
                        type: 'item',
                        url: '/task/hidden'
                    },
                    {
                        id: 'createtask',
                        title: 'Create New Task',
                        type: 'item',
                        url: '/task/createtask'
                    },
                    {
                        id: 'updatetask',
                        title: 'Update Task',
                        type: 'item',
                        url: '/task/updatetask',
                        hidden: true,
                    },
                    {
                        id: 'taskdetails',
                        title: 'Tasks Details',
                        type: 'item',
                        url: '/task/taskdetails',
                        hidden: true,
                    },


                ]
            },
            {
                id: 'bank',
                title: 'Bank',
                type: 'collapsable',
                icon: 'account_balance',
                children: [
                    {
                        id: 'ledger',
                        title: 'Wallet',
                        type: 'collapsable',
                        icon: 'description',
                        children: [
                            {
                                id: 'superior',
                                title: 'Superior Coin',
                                type: 'item',
                                url: '/bank/bank-and-ledger/superiorcoin',
                            },
                            {
                                id: 'bitcoin',
                                title: 'Bitcoin',
                                type: 'item',
                                url: '/bank/bank-and-ledger/bitcoin',
                            },
                            {
                                id: 'membership',
                                title: 'Membership',
                                type: 'item',
                                url: '/bank/bank-and-ledger/membership',
                            },
                        ]
                        
                    },
                    {
                        id: 'history',
                        title: 'History',
                        type: 'collapsable',
                        icon: 'history',
                        children: [
                            {
                                id: 'task-reward',
                                title: 'Task Rewards',
                                type: 'item',
                                url: '/bank/tasks/rewards',
                            },
                            {
                                id: 'blog-payout',
                                title: 'Blog Payout',
                                type: 'item',
                                url: '/bank/blog-payout',
                            },
                            {
                                id: 'referral-points',
                                title: 'Referral / Points',
                                type: 'item',
                                url: '/bank/referral/points',
                            },
                            {
                                id: 'membership-earnings',
                                title: 'Membership Earnings',
                                type: 'item',
                                url: '/bank/membership-earnings',
                            },
                            {
                                id: 'gift',
                                title: 'Gift',
                                type: 'item',
                                url: '/bank/gift/coins',
                            },
                            {
                                id: 'bonus-coin',
                                title: 'Bonus Coin / Social Connect',
                                type: 'item',
                                url: '/bank/bonus/coins',
                            },
                            {
                                id: 'option-trade',
                                title: 'Option Trade',
                                type: 'item',
                                url: '/bank/option/trade',
                            },
                        ]
                    },


                ]
            },
            {
                id: 'leaderboard',
                title: 'Leaderboard',
                type: 'collapsable',
                icon: 'star_rate',
                children: [
                    {
                        id: 'complete',
                        title: 'General',
                        type: 'item',
                        url: '/leaderboard/general'
                    },
                    {
                        id: 'mytask',
                        title: 'My Leaderboard',
                        type: 'item',
                        url: '/leaderboard/leaderboard'
                    },
                    {
                        id: 'referral',
                        title: 'My Referral',
                        type: 'item',
                        url: '/leaderboard/referral'
                    },


                ]
            },
            {
                id: 'vote',
                title: 'Voting Poll',
                type: 'item',
                icon: 'border_color',
                url: '/others/voting-active'
            },
            {
                id: 'vote-ended',
                title: 'Voting Ended',
                type: 'item',
                url: '/others/voting-ended',
                hidden: true,
            },
            {
                id: 'vote-analytic',
                title: 'Voting Analytic',
                type: 'item',
                url: '/others/voting-analytic',
                hidden: true,
            },
            {
                id: 'announcement',
                title: 'Announcement',
                type: 'item',
                icon: 'record_voice_over',
                url: '/others/announcement'
            }
            ,{
                id: 'steemit-calculator',
                title: 'Steemit Calculator',
                type: 'item',
                icon: 'add',
                url: '/steemit-calculator'
            },
            {
                id: 'adetails',
                title: 'Announcement Details',
                type: 'item',
                url: '/others/announcement-details',
                hidden: true,
            },

            {
                id: 'myprofile',
                title: 'My Profile',
                type: 'item',
                url: '/others/profile/:username',
                hidden: true,
            },
            {
                id: 'memcheckout',
                title: 'Membership Checkout',
                type: 'item',
                url: '/modules/account-settings/shared-settings/membership-checkout',
                hidden: true,
            },

            {
                id: 'faq',
                title: 'FAQ',
                type: 'item',
                icon: 'help',
                url: '/others/faq'
            },
            {
                id: 'all-faq',
                title: 'All FAQ',
                type: 'item',
                icon: 'help',
                url: '/others/faq/all-faq',
                hidden: true,
            },
            {
                id: 'sup',
                title: 'Superior Coin',
                type: 'item',
                icon: 'attach_money',
                url: 'http://superior-coin.com/',
                hidden: true,
            },
            {
                id: 'kblog',
                title: 'KBlog.io',
                type: 'item',
                icon: 'attach_money',
                url: 'https://kblog.io/feed/trending',
                hidden: true,
            },
            {
                id: 'notification',
                title: 'Notification',
                type: 'item',
                icon: 'attach_money',
                url: '/others/notifications',
                hidden: true,
            },
            {
                id: 'main-search',
                title: 'Notification',
                type: 'item',
                icon: 'attach_money',
                url: '/others/search',
                hidden: true,
            },
        ]  
    }  
];
