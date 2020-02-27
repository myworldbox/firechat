// Your web app's Firebase configuration
firebaseConfig = {
    apiKey: "AIzaSyChapt8x9tsaFvZSxXx9rRwMETpjwDkfZ8",
    authDomain: "firechat-e13b4.firebaseapp.com",
    databaseURL: "https://firechat-e13b4.firebaseio.com",
    projectId: "firechat-e13b4",
    storageBucket: "firechat-e13b4.appspot.com",
    messagingSenderId: "403563906662",
    appId: "1:403563906662:web:efef6749fa235fa79e0fa7",
    measurementId: "G-M1854PE342"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
alias = prompt("這是一個聯天室的示範項目，未來有時間作者會更新。\nThis is a demo of chatroom application; provided I have enough time, I will update it.\n\n請輸入你的名字：\nEnter your alias:");

// listen for incoming messages
firebase.database().ref("messages").on("child_added", function (snapshot) {
    html = "";
    // give each message a unique ID
    html += "<div id='message-" + snapshot.key + "'>";
    // show delete button if message is sent by me
    if (snapshot.val().sender == alias) {
        html += "<button id='delete' data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>✕</button>";
    }
    html += snapshot.val().sender + ": " + snapshot.val().message;
    html += "</div>";
    document.getElementById("messages").innerHTML += html;
});

// attach listener for delete message
firebase.database().ref("messages").on("child_removed", function (snapshot) {
    // remove message node
    document.getElementById("message-" + snapshot.key).innerHTML = "Removed";
});

function sendMessage() {
    // get message
    message = document.getElementById("message").value;

    // save in database
    firebase.database().ref("messages").push().set({
        "sender": alias,
        "message": message
    });
    firebase.database().ref("messages").on("child_added", function(snapshot) {
        element = document.getElementById("message-" + snapshot.key);
        element.scrollIntoView();
    });
    // prevent form from submitting
    return false;
}

function deleteMessage(self) {
    // get message ID
    messageId = self.getAttribute("data-id");

    // delete message
    firebase.database().ref("messages").child(messageId).remove();
}