/**
 * 1. Render songs - OK
 * 2. Scroll top - OK
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / previous
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $(".dashboard__cd");

const heading = $(".dashboard__heading");
const cdThumb = $(".dashboard__thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");

const app = {
    currentIndex: 0,
    songs: [
        {
            name: "Nơi Này Có Anh",
            singer: "Sơn Tùng-MTP",
            path: "./assets/music/music-1.mp3",
            img: "./assets/imgs/music-item-img-1.jpg",
        },
        {
            name: "Thu Cuối",
            singer: "Mr.T ft Yanbi & Hằng Bingboong",
            path: "./assets/music/music-2.mp3",
            img: "./assets/imgs/music-item-img-2.jpg",
        },
        {
            name: " Muộn Rồi Mà Sao Còn",
            singer: "Sơn Tùng-MTP",
            path: "./assets/music/music-3.mp3",
            img: "./assets/imgs/music-item-img-3.jpg",
        },
        {
            name: "Cứ Chill Thôi",
            singer: "Suni Hạ Linh & Rhymastic",
            path: "./assets/music/music-4.mp3",
            img: "./assets/imgs/music-item-img-4.jpg",
        },
        ,
        {
            name: "Giá Như Em Nhìn Lại",
            singer: "JSOL x VIRUSS",
            path: "./assets/music/music-5.mp3",
            img: "./assets/imgs/music-item-img-5.jpg",
        },
        ,
        {
            name: "Nàng Thơ",
            singer: "Hoàng Dũng",
            path: "./assets/music/music-6.mp3",
            img: "./assets/imgs/music-item-img-6.jpg",
        },
        ,
        {
            name: "Phố Cũ Còn Anh",
            singer: "Quinn ft Chilly",
            path: "./assets/music/music-7.mp3",
            img: "./assets/imgs/music-item-img-7.jpg",
        },
        ,
        {
            name: "Suýt Nữa Thì",
            singer: "ANDIEZ x BITI'S HUNTER",
            path: "./assets/music/music-8.mp3",
            img: "./assets/imgs/music-item-img-8.jpg",
        },
        ,
        {
            name: "Cảm Nắng",
            singer: "Suni Hạ Linh",
            path: "./assets/music/music-9.mp3",
            img: "./assets/imgs/music-item-img-9.jpg",
        },
        ,
        {
            name: "Ngỏ Lời",
            singer: "Suni Hạ Linh",
            path: "./assets/music/music-10.mp3",
            img: "./assets/imgs/music-item-img-10.jpg",
        },
    ],
    render: function () {
        const htmls = this.songs.map((song) => {
            return `
                <li class="music-item">
                    <img
                        src="${song.img}"
                        alt=""
                        class="music-item__img"
                    />
                    <div class="music-item__body">
                        <h1 class="music-item__title">${song.name}</h1>
                        <p class="music-item__desc">
                            ${song.singer}
                        </p>
                    </div>
                    <img
                        src="./assets/icons/setting.svg"
                        alt=""
                        class="music-item__setting"
                    />
                </li>
        `;
        });
        $(".music-list").innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    handleEvents: function () {
        const cdWidth = cd.offsetWidth;

        document.onscroll = function () {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
        audio.src = this.currentSong.path;
    },
    start: function () {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Lắng nghe / xử lý các sự kiện
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy app
        this.loadCurrentSong();

        // Render playlist
        this.render();
    },
};

app.start();
