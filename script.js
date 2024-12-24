import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC8sIL5wmKByVpR8O3lbbps5BNmxk3zSWY",
    authDomain: "mido-wos.firebaseapp.com",
    databaseURL: "https://mido-wos-default-rtdb.firebaseio.com",
    projectId: "mido-wos",
    storageBucket: "mido-wos.appspot.com",
    messagingSenderId: "407415975062",
    appId: "1:407415975062:web:af8010be03e7579ec2a6b7",
    measurementId: "G-L2LCHFB7M6"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// استماع إلى الحدث 'click' على زر إضافة اللاعب
document.getElementById('addPlayerButton').addEventListener('click', addPlayer);

function addPlayer() {
    const playerName = document.getElementById('playerName').value;
    const playerId = document.getElementById('playerId').value;
    const playerRegion = document.getElementById('playerRegion').value;
    const playerPower = document.getElementById('playerPower').value;
    const playerHome = document.getElementById('playerHome').value;
    const heroPower = document.getElementById('heroPower').value;

    if (playerName && playerId && playerRegion && playerPower && playerHome && heroPower) {
        const player = {
            name: playerName,
            id: playerId,
            region: playerRegion,
            power: playerPower,
            home: playerHome,
            heroPower: heroPower  // استخدام المفتاح الصحيح
        };

        // إضافة اللاعب إلى Firebase
        const playersRef = ref(database, 'players');
        const newPlayerRef = push(playersRef);
        set(newPlayerRef, player);

        displayPlayers();

        // مسح القيم بعد إضافة اللاعب
        document.getElementById('playerName').value = '';
        document.getElementById('playerId').value = '';
        document.getElementById('playerRegion').value = '';
        document.getElementById('playerPower').value = '';
        document.getElementById('playerHome').value = '';
        document.getElementById('heroPower').value = '';
    } else {
        alert("Please fill in all fields.");
    }
}

function displayPlayers() {
    const playerList = document.getElementById('players');
    playerList.innerHTML = '';

    // قراءة اللاعبين من Firebase باستخدام onValue
    const playersRef = ref(database, 'players');
    onValue(playersRef, (snapshot) => {
        const players = snapshot.val();
        if (players) {
            for (let id in players) {
                const player = players[id];

                const li = document.createElement('li');
                li.textContent = `${player.name} - ${player.id} - ${player.region} - ${player.power} - ${player.home} - ${player.heroPower}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    deletePlayer(id);
                });

                li.appendChild(deleteButton);
                playerList.appendChild(li);
            }
        }
    });
}

function deletePlayer(id) {
    const playerRef = ref(database, 'players/' + id);
    remove(playerRef);
    displayPlayers();
}

// استدعاء displayPlayers عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayPlayers);

document.addEventListener("DOMContentLoaded", function() {
    const typingElement = document.querySelector('.typing-effect');
    
    // تأخير الوقت لتكرار الكتابة بعد مدة معينة
    setInterval(() => {
        typingElement.style.animation = 'none'; // إزالة التأثير مؤقتًا
        typingElement.offsetHeight; // إعادة التفاعل مع العنصر
        typingElement.style.animation = ''; // إعادة التأثير
    }, 4000); // هنا يمكنك تحديد الوقت بين التكرارات
});
