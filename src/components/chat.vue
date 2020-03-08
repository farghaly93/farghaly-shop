<template>
<div style="width:320px;">
        <p @click="showChat = !showChat" class="headerr">Admin</p>
        <div v-if="showChat" class="col-sm-12 col-sm-offset-12 frame">
            <ul v-if="showChat">
                <li v-for="(msg, index) in messages" :key="index" style="width:100%;">
                    <div :class="msg.role==='admin'?'msj-rta macro': 'msj macro'">
                        <div v-if="msg.role==='user'" class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="assets/img/user.png" /></div>                            
                        <div class="text text-r">
                            <p>{{msg.message}}</p>
                            <p><small>{{msg.date}}</small></p>
                        </div>
                        <div v-if="msg.role==='admin'" class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="assets/img/admin.png" /></div>                            
                    </div>
                </li>
            </ul>
            <div v-if="showChat">
                <div class="msj-rta macro">                        
                    <div class="text text-r" style="background:whitesmoke !important">
                        <input v-model="message" @keypress="sendMessage" class="mytext" placeholder="Type a message"/>
                    </div> 

                </div>
                <div style="padding:10px;">
                    <span class="glyphicon glyphicon-share-alt"></span>
                </div>                
            </div>
        </div> 
</div>
</template>

<script>
import io from 'socket.io-client'
import Axios from 'axios';
export default {
    data() {
        return {
            socket: io('localhost:3001'),
            message: '',
            messages: [],
            showChat: false,
            months: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    },
    computed: {
            userEmail(){ 
                return this.$store.getters.userEmail;
                },
            role() {
                return this.$store.getters.userEmail?'user': 'admin'
            },
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
        sendMessage(e) {
            if(e.keyCode === 13) {
                this.socket.emit('SEND_MESSAGE', {
                    userEmail: this.userEmail,
                    message: this.message,
                    role: this.role,
                    date: this.nowDate
                });
                this.message = '';
            }
        }
    },
    created() {
        Axios.get('/getmessages/'+this.userEmail).then(res => {
            this.messages = res.data.messages;
        })
    },
    mounted() {
        this.socket.on('MESSAGE', (data) => {
           // if(data.userEmail === this.userEmail) {
                console.log(data.userEmail);
                this.messages.push(data);
           // }
        });
    }
}
</script>

<style scoped>
.mytext{
    border:0;padding:10px;background:whitesmoke;
}
.text{
    width:75%;display:flex;flex-direction:column;
}
.text > p:first-of-type{
    width:100%;margin-top:0;margin-bottom:auto;line-height: 13px;font-size: 12px;
}
.text > p:last-of-type{
    width:100%;text-align:right;color:silver;margin-bottom:-7px;margin-top:auto;
}
.text-l{
    float:left;padding-right:10px;
}        
.text-r{
    float:right;padding-left:10px;
}
.avatar{
    display:flex;
    justify-content:center;
    align-items:center;
    width:25%;
    float:left;
    padding-right:10px;
}
.macro{
    margin-top:5px;width:85%;border-radius:5px;padding:5px;display:flex;
}
.msj-rta{
    float:right;background:whitesmoke;
}
.msj{
    float:left;background:white;
}
.frame{
    background:#e0e0de;
    width: 1200px;
    overflow:hidden;
    padding:0;
    height: 450px;
}
.frame > div:last-of-type{
    position:absolute;bottom:0;width:100%;display:flex;
}
.frame > div > div > div:nth-child(2) > span{
    background: whitesmoke;padding: 10px;font-size: 21px;border-radius: 50%;
}
.frame > div > div > div.msj-rta.macro{
    margin:auto;margin-left:1%;
}
ul {
    width:100%;
    list-style-type: none;
    padding:18px;
    position:absolute;
    bottom:47px;
    display:flex;
    flex-direction: column;
    top:0;
    overflow-y:scroll;
}
.msj:before{
    width: 0;
    height: 0;
    content:"";
    top:-5px;
    left:-14px;
    position:relative;
    border-style: solid;
    border-width: 0 13px 13px 0;
    border-color: transparent #ffffff transparent transparent;            
}
.msj-rta:after{
    width: 0;
    height: 0;
    content:"";
    top:-5px;
    left:14px;
    position:relative;
    border-style: solid;
    border-width: 13px 13px 0 0;
    border-color: whitesmoke transparent transparent transparent;           
}  
input:focus{
    outline: none;
}        
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #d4d4d4;
}
::-moz-placeholder { /* Firefox 19+ */
    color: #d4d4d4;
}
:-ms-input-placeholder { /* IE 10+ */
    color: #d4d4d4;
}
:-moz-placeholder { /* Firefox 18- */
    color: #d4d4d4;
}
.headerr {
    background-color: rgba(46, 114, 189, 0.5);
    color: #fff;
    text-align: center;
    cursor: pointer;
    padding: 2px;
}
.headerr p {
    font-size: 22px;
    font-weight: bold;
}
</style>