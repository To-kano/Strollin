import firebase from 'firebase'

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBCdtce-XSwbW8km0PnUaiv06rhHzVefSY",
                authDomain: "reactchat-f028c.firebaseapp.com",
                databaseURL: "https://reactchat-f028c.firebaseio.com",
                projectId: "reactchat-f028c",
                storageBucket: "reactchat-f028c.appspot.com",
                messagingSenderId: "51135233063",
                appId: "1:51135233063:web:3013465ca8cdcadd1fa202",
                measurementId: "G-45C0Q21RH7"
            });
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            item.user._id = item._id;
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };
            console.log("CONSOLE LOG : item = ", item);
            console.log("CONSOLE LOG : message = ", message);
            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off()
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth.currentUser || {}).uid;
    }
}

export default new Fire();