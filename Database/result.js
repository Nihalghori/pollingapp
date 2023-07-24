const firebaseConfig = {
    // Your firebaseConfig object properties (apiKey, authDomain, etc.) go here
    apiKey: "AIzaSyDcUFmb-Ax4LDJgu21XE3na6vlrfyDNTFs",
    authDomain: "login-with-firebase-data-875e9.firebaseapp.com",
    projectId: "login-with-firebase-data-875e9",
    storageBucket: "login-with-firebase-data-875e9.appspot.com",
    messagingSenderId: "83678925982",
    appId: "1:83678925982:web:4c317523f5fe736efd978f",
    measurementId: "G-MZ9J0Y9FDP"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Fetch final vote counts and display them on the results page
const finalVoteRef = database.ref("message/");
finalVoteRef.on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
        let finalVoteA = 0;
        let finalVoteB = 0;
        for (let key in data) {
            if (data[key].Team === 'teamA') {
                finalVoteA = data[key].VoteCount;
            } else if (data[key].Team === 'teamB') {
                finalVoteB = data[key].VoteCount;
            }
        }
        const finalVoteElementA = document.getElementById('finalVoteA');
        const finalVoteElementB = document.getElementById('finalVoteB');
        finalVoteElementA.innerHTML = `<h3>Team A: ${finalVoteA}</h3>`;
        finalVoteElementB.innerHTML = `<h3>Team B: ${finalVoteB}</h3>`;
    }
});
