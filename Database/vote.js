const firebaseConfig = {
    // Your Firebase config here...
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

let teamAVotes = 0;
let teamBVotes = 0;
let userVote = null; // To store the user's own vote

// Check if a user is authenticated
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        const userId = user.uid;
        // Fetch the user's vote (if any) and display it
        fetchUserVote(userId);
    } else {
        // User is not signed in or signed out, clear the user's vote
        userVote = null;
        displayUserVote();
    }
});

// Vote buttons event listeners
const voteButtonA = document.getElementById('web dev');
const voteButtonB = document.getElementById('GRAPHICS');

voteButtonA.addEventListener("click", () => vote("web dev"));
voteButtonB.addEventListener("click", () => vote("GRAPHICS"));

// Vote function
function vote(team) {
    // Check if the user is authenticated before allowing them to vote
    const user = firebase.auth().currentUser;
    if (!user) {
        alert("You need to sign in to vote.");
        return;
    }

    // Check if the user has already voted
    if (userVote) {
    
        return;
    }

    if (team === 'web dev') {
        teamAVotes++;
        updateVoteCount('web dev', teamAVotes);
        userVote = 'web dev';
    } else if (team === 'GRAPHICS') {
        teamBVotes++;
        updateVoteCount('GRAPHICS', teamBVotes);
        userVote = 'GRAPHICS';
    }

    // Save the user's vote in the database
    const userId = user.uid;
    saveUserVote(userId, userVote);
    displayUserVote();
}

// Update vote count display and send data to Firebase
function updateVoteCount(team, voteCount) {
    const voteElement = (team === 'web dev') ? document.getElementById('voteA') : document.getElementById('voteB');
    voteElement.innerHTML = `<h3> ${team.toUpperCase()}: ${voteCount}</h3>`;
    sendData(team, voteCount);
}

// Send vote data to Firebase Realtime Database
function sendData(team, voteCount) {
    let listRef = database.ref("message/");
    let newRef = listRef.push();
    newRef.set({
        "Team": team,
        "VoteCount": voteCount
    });
}

// Fetch the user's vote from the database
function fetchUserVote(userId) {
    let userVoteRef = database.ref(`userVotes/${userId}`);
    userVoteRef.on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
            userVote = data.vote;
            displayUserVote();
        }
    });

    // Fetch all votes from the database and display them
    let allVotesRef = database.ref("message/");
    allVotesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
            teamAVotes = 0;
            teamBVotes = 0;
            for (let key in data) {
                if (data[key].Team === 'web dev') {
                    teamAVotes = data[key].VoteCount;
                    updateVoteCount('web dev', teamAVotes);
                } else if (data[key].Team === 'GRAPHICS') {
                    teamBVotes = data[key].VoteCount;
                    updateVoteCount('GRAPHICS', teamBVotes);
                }
            }
        }
    });
}

// Save the user's vote in the database
function saveUserVote(userId, vote) {
    let userVoteRef = database.ref(`userVotes/${userId}`);
    userVoteRef.set({ vote });
}

// Display the user's own vote on the page
function displayUserVote() {
    const userVoteElement = document.getElementById('userVote');
    if (userVote) {
        userVoteElement.textContent = `Your Vote:${userVote.toUpperCase()}`;
    } else {
        userVoteElement.textContent = '';
    }
}



