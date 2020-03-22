<template>
    <div class="container">
        <div class="row">
            <div class="people-list col-md-3">
                <div class="search">
                    <input @input="search" type="text" placeholder="search" />
                    <i class="fa fa-search"></i>
                </div>
                <ul class="list">
                    <li @click="() => currentChat(user)" :key="i" v-for="(user, i) in filteredUsers" class="clearfix">
                    <img height="50px" width="50px" src="https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png.png" alt="avatar" />
                    <div class="about">
                        <div class="name">{{user._id.split('@')[0]}}</div>
                        <div class="status">
                        <i class="fa fa-circle online"></i> ({{user.count}}) messages
                        </div>
                    </div>
                    </li>
                </ul>
            </div>
        
            <div class="chatt col-md-9">
                <div class="chat-header clearfix">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                    
                    <div class="chat-about">
                    <div class="chat-with">Chat with {{currentUSerEmail}}</div>
                    <div class="chat-num-messages">already {{currentMessageCount}} messages</div>
                    </div>
                    <i class="fa fa-star"></i>
                </div> 
                
                <div class="chat-history">
                    <ul>
                    <li v-for="(mess, i) in currentUserMessages" :key="i" class="clearfix">
                        <div class="message-data align-right">
                        <span class="message-data-time" >{{mess.date}}</span> &nbsp; &nbsp;
                        <span class="message-data-name" ><strong>{{mess.role==='admin'?'Admin':'User'}}</strong></span> <i class="fa fa-circle me"></i>
                        
                        </div>
                        <div :class="mess.role==='admin'?'my-message':'other-message'" class="message  float-right">
                        {{mess.message}}
                        </div>
                    </li>
                    
                    </ul>
                    
                </div> 
                
                <div class="chat-message clearfix">
                    <textarea v-model="message" @keypress="send" name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>
                            
                    <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-file-image-o"></i>
                    
                    <button @click="clickSend">Send</button>

                </div> 
        
            </div>
        </div>
    
  </div> <!-- end container -->

</template>
<script>
import axios from 'axios';
import io from 'socket.io-client'

export default {
    created() {
        axios.get('getUsersChats').then(res => {
            this.users = res.data.chats
            this.filteredUsers = res.data.chats
        });
    },
    mounted() {
        this.socket.on('MESSAGE', (data) => {
           // if(data.userEmail === this.userEmail) {
                console.log(data.userEmail);
                this.currentUserMessages.push(data);
           // }
        });
    },
    data() {
        return {
            socket: io('localhost:3001'),
            months: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            users: [],
            filteredUsers: [],
            currentUSerEmail: '',
            currentMessageCount: 0,
            currentUserMessages: [],
            message: ''
        }
    },
    computed: {
        nowDate() {
            const date = (+new Date().getDay()+1)+' '+this.months[+new Date().getMonth()]+' '+ new Date().getFullYear();
            let minutes = new Date().getMinutes();
            if(minutes < 10) minutes = '0'+minutes

            let hours = new Date().getHours();
            if(hours < 12) hours = hours + ':' + minutes + 'Am'
            else hours = hours - 12 + ':' + minutes + 'Pm'
            return date + '-' + hours;
        }
    },
    methods: {
        search(event) {
            const users = [...this.users];
            const filtered = users.filter(user => user._id.includes(event.target.value));
            this.filteredUsers = [...filtered];
        },
        currentChat(user) {
            this.currentUSerEmail = user._id;
            this.currentMessageCount = user.count;
            axios.get('/getUserchat/'+user._id).then(res => {
                this.currentUserMessages = res.data.messages;
            });
        },
        send(key) {
            if(key.keyCode === 13) {
                this.sendMessage();
                this.message = ''
            }
        } ,
        clickSend() {
            this.sendMessage();                
            this.message = ''
        },
        sendMessage() {
            this.socket.emit('SEND_MESSAGE', {
                userEmail: this.currentUSerEmail,
                message: this.message,
                role: 'admin',
                date: this.nowDate
            });
        }
    }
}
</script>
<style scoped lang='scss'>
    @import '../../scss/room.scss';
</style>