import { firestore } from "./firebase-config.js";
import { collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';

// delete button appear on each song (red circle with white X)

// noti: "u rlly wanna delete?"
// yes: del doc from "songs"
// no: nothing happen

import { changeBtnStatus } from "./common.js";

// ARTIST/USER PAGE-BODY DISPLAY-------------------------------
const isArtist = localStorage.getItem("isArtist");
const pageBody = document.getElementById("page-body");
const userHeaderInfo = document.getElementById("user-header-info");
const usernameDisplay = document.getElementById("user-header-username");
const username = localStorage.getItem("username");

usernameDisplay.innerHTML = `${username}`;

if (isArtist == "true") {
    // change button to "publish"
    userHeaderInfo.insertAdjacentHTML("beforeend", `<a href="publish.html" class="w-fit"><button id="btn-publish" class="block rounded-full bg-bittersweet hover:bg-darkbitterswwet font-semibold text-sm text-white w-fit mt-2 px-4 py-2">Publish</button></a>`);
    // show published tracks
    pageBody.innerHTML = `
    <div class="flex gap-2 mb-5">
        <button id="btn-your-tracks" class="w-fit rounded-3xl bg-bittersweet text-white py-2 px-4 text-sm">Tracks</button>
        <button id="btn-your-episodes" class="w-fit rounded-3xl bg-[#ffd3da] text-black py-2 px-4 text-sm">Episodes</button>
    </div>
    <div id="your-tracks" class="category">
        <div class="category-title">Your tracks</div>
        <div id="your-tracks-content" class="category-carousel flex gap-2"></div>
        <div class="pagination w-full flex justify-center items-center gap-4 mt-7">
            <button
                class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                aria-hidden="true" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
            </button>
            <div class="flex items-center gap-2">
                <button
                class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50"
                type="button">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    1
                </span>
                </button>
                <button
                class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50"
                type="button">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    2
                </span>
                </button>
                <button
                class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    3
                </span>
                </button>
                <button
                class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50"
                type="button">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    4
                </span>
                </button>
                <button
                class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50"
                type="button">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    5
                </span>
                </button>
            </div>
            <button
                class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                aria-hidden="true" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
            </button>
        </div> 
    </div>
    <div id="your-episodes" class="category hidden">
        <div class="category-title">Your episodes</div>
        <!-- div (max 20 -> see more -> href: page of that category): playlist, songs, etc -->
        <!-- js: addAdjHTML -->
        <!-- animation: think about scrolling effect -->
        <a href="Silverspoon">
            <div class="category-content">
                <img src="https://i.scdn.co/image/ab67616d0000b2734b5186cf9433dcc16b11db5c" alt="">
                <div class="category-content-name">Silver Spoon</div>
                <a href="BTS" class="category-content-description">Have a sip - 42 mins</a>
            </div>
        </a>
    </div>
    `

    // BUTTONS-------------------------------------
    document.getElementById("btn-your-tracks").onclick = () => {
        changeBtnStatus("btn-your-tracks", "#ff6176", "#ffffff");
        changeBtnStatus("btn-your-episodes", "#ffd3da", "black");

        document.getElementById('your-tracks').style.display = "block";
        document.getElementById('your-episodes').style.display = "none";
    }

    document.getElementById("btn-your-episodes").onclick = () => {
        changeBtnStatus("btn-your-episodes", "#ff6176", "#ffffff");
        changeBtnStatus("btn-your-tracks", "#ffd3da", "black");

        document.getElementById('your-episodes').style.display = "block";
        document.getElementById('your-tracks').style.display = "none";
    }

    // 
    const yourTracksContent = document.getElementById("your-tracks-content");
    const colRef = collection(firestore, "songs");

    const querySnapshot = await getDocs(query(colRef, where("artist", "==", username)));

    querySnapshot.forEach(doc => {
        const data = doc.data();
        yourTracksContent.insertAdjacentHTML("beforeend", `
            <div id='${doc.id}' class="category-content">
                <img src="${data.thumbnail}" alt="">
                <div class="category-content-name">${data.title}</div>
                <a href="BTS" class="category-content-description">${data.artist}</a>
            </div>
        `)
    })
}