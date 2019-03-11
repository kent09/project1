import { Component, OnInit, ViewEncapsulation, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { ChatPanelService } from './chat-panel.service';
import { GlobalsService } from 'app/globals/globals.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

@Component({
    selector: 'chat-panel',
    templateUrl: './chat-panel.component.html',
    styleUrls: ['./chat-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatPanelComponent implements OnInit, AfterViewInit {
    user: any = null;
    contacts = {
        listed: null,
        unlisted: null,
    };
    directory = {
        listed: [],
        unlisted: [],
    };

    isLoadingChats = false;
    selectedContact = null;
    conversations = null;
    message = '';

    @ViewChildren(FusePerfectScrollbarDirective)
    _fusePerfectScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;
    _chatViewScrollbar: FusePerfectScrollbarDirective;

    constructor(private _Chat: ChatPanelService, private _globals: GlobalsService, private _fuseSidebarService: FuseSidebarService) {
        this._Chat.listen().subscribe(($event) => {
            console.log($event);
            if ($event.method === 'toggleChat') {
                this.toggleChat($event.data.contact_id);
            }
        });
    }

    ngOnInit(): void {
        console.log('Chat Start');
        const token_str = sessionStorage.getItem('token');
        if (token_str !== null) {
            const token = this._globals.parseJwt(token_str);
            this.user = token.data;
            this.getContactList();
            this.listeners();
        }
    }

    ngAfterViewInit(): void {
        this._chatViewScrollbar = this._fusePerfectScrollbarDirectives.find((directive) => {
            return directive.elementRef.nativeElement.id === 'messages';
        });
    }

    listeners(): void {
        this._Chat.register(this.user.user_id);
        this._Chat.socket.on('user-connected', (data) => {
            if (data.user_id === this.user.user_id) {
                console.log('You are Connected');
            } else {
                console.log('User Connected');
                this.updateContactStatus(data.user_id);
            }
        });
        this._Chat.socket.on('user-disconnected', (data) => {
            if (data.user_id === this.user.user_id) {
                console.log('You are Disconnected');
            } else {
                console.log('User Disconnected');
                this.updateContactStatus(data.user_id, false);
            }
        });
        this._Chat.socket.on('chat', (data) => {
            if (this.selectedContact !== null) {
                if (this.selectedContact.user_id === data.from && this.selectedContact.contact_id === data.to) {
                    this.conversations.push(data);
                } else if (this.selectedContact.user_id === data.to && this.selectedContact.contact_id === data.from) {
                    this.conversations.push(data);
                }
            }
            if (data.to === this.user.user_id) {
                let $process = false;
                if (this.selectedContact === null) {
                    $process = true;
                } else {
                    if (this.selectedContact.contact_id !== data.from) {
                        $process = true;
                    }
                }
                if ($process) {
                    if (this.directory.listed[data.from] !== undefined) {
                        const key = this.directory.listed[data.from];
                        if (this.contacts.listed[key] !== undefined) {
                            this.contacts.listed[key].unseen_count++;
                        }
                    }
                }
             }
        });
    }

    updateContactStatus($user_id: number, $online = true): void {
        if (this.directory.listed[$user_id] !== undefined) {
            const key = this.directory.listed[$user_id];
            if (this.contacts.listed[key] !== undefined) {
                if ($online) {
                    this.contacts.listed[key].online_status = {
                        text: 'online',
                        type: 'success',
                    };
                } else {
                    this.contacts.listed[key].online_status = {
                        text: 'offline',
                        type: 'default',
                    };
                }
            }
        }
    }
    
    getContactList(): void {
        this.isLoadingChats = true;
        this._Chat.contacts(this.user.user_id).subscribe(res => {
            this.isLoadingChats = false;
            if (res.code === 200) {
                this.contacts = res.data.items;
                for (let i = 0; i < this.contacts.listed.length; i++) {
                    const element = this.contacts.listed[i];
                    this.directory.listed[element.contact_id] = i;
                }
                for (let i = 0; i < this.contacts.unlisted.length; i++) {
                    const element = this.contacts.unlisted[i];
                    this.directory.unlisted[element.contact_id] = i;
                }
            }
        });
    }

    keyPress($e): void {
        if ($e.code === 'Enter') {
            if ($e.shiftKey || $e.ctrlKey) {
                this.message = this.message + '\n';
            } else {
                this.send();
            }
        }
    }

    send(): void {
        if (this.message.trim().length > 0) {
            this.message = this.message.replace(/(?:\r\n|\r|\n)/g, '<br>');
            const data: MessageParamInterface = {
                from: this.user.user_id,
                to: this.selectedContact.contact_id,
                message: this.message,
                is_private: 1,
            };
            this._Chat.send(data);
            this.message = '';
        }
    }

    toggleChat($contact_id: number): void {
        this.conversations = null;
        this.unfoldSidebarTemporarily();
        if (this.directory.listed[$contact_id] !== undefined) {
            const key = this.directory.listed[$contact_id];
            if (this.contacts.listed[key] !== undefined) {
                this.selectedContact = this.contacts.listed[key];
                this._Chat.conversation(this.selectedContact.user_id, this.selectedContact.contact_id).subscribe(res => {
                    if (res.code === 200) {
                        this.conversations = res.data.items;
                        this.conversations.reverse();
                        if (this.directory.listed[this.selectedContact.contact_id] !== undefined) {
                            const key = this.directory.listed[this.selectedContact.contact_id];
                            if (this.contacts.listed[key] !== undefined) {
                                this.contacts.listed[key].unseen_count = 0;
                            }
                        }
                    }
                });
                this._prepareChatForReplies();
            }
        }
    }

    foldSidebarTemporarily(): void {
        this.conversations = null;
        this.selectedContact = null;
        this._fuseSidebarService.getSidebar('chatPanel').foldTemporarily();
    }

    unfoldSidebarTemporarily(): void {
        this._fuseSidebarService.getSidebar('chatPanel').unfoldTemporarily();
    }

    _prepareChatForReplies(): void {
        setTimeout(() => {
            if (this._chatViewScrollbar) {
                this._chatViewScrollbar.update();
                setTimeout(() => {
                    this._chatViewScrollbar.scrollToBottom(0);
                }, 1000);
            }
        });
    }

    avatarImagePath($user_id: number): string {
        return this._globals.avatarImagePath($user_id);
    }

    isFirstMessageOfGroup(message: any, i: number): boolean {
        return (i === 0 || this.conversations[i - 1] && this.conversations[i - 1].to !== message.from);
    }

    isLastMessageOfGroup(message: any, i: number): boolean {
        return (i === this.conversations.length - 1 || this.conversations[i + 1] && this.conversations[i + 1].to === message.to && this.conversations[i + 1].from !== message.from);
    }

    shouldShowContactAvatar(message: any, i: number): boolean {
        return (
            message.from !== this.user.user_id &&
            ((this.conversations[i + 1] && this.conversations[i + 1].message != this.user.user_id) || !this.conversations[i + 1])
        );
    }

    profileLink($username: string): string {
        return '/others/profile/' + $username;
    }
}

export interface MessageParamInterface {
    from: number;
    to: number;
    message: string;
    is_private: number;
}
