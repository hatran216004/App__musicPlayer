/**
 * 1. Render songs - OK
 * 2. Scroll top - OK
 * 3. Play / pause / seek - OK
 * 4. CD rotate - OK
 * 5. Next / previous - OK
 * 6. Random - OK
 * 7. Next / Repeat when ended - OK
 * 8. Active song - OK
 * 9. Scroll active song into view - OK
 * 10. Play song when click - OK
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".music-player");
const cd = $(".dashboard__cd");
const heading = $(".dashboard__heading");
const cdThumb = $(".dashboard__thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const preBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const musicList = $(".music-list");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    // config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
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
        {
            name: "Giá Như Em Nhìn Lại",
            singer: "JSOL x VIRUSS",
            path: "./assets/music/music-5.mp3",
            img: "./assets/imgs/music-item-img-5.jpg",
        },
        {
            name: "Nàng Thơ",
            singer: "Hoàng Dũng",
            path: "./assets/music/music-6.mp3",
            img: "./assets/imgs/music-item-img-6.jpg",
        },
        {
            name: "Phố Cũ Còn Anh",
            singer: "Quinn ft Chilly",
            path: "./assets/music/music-7.mp3",
            img: "./assets/imgs/music-item-img-7.jpg",
        },
        {
            name: "Suýt Nữa Thì",
            singer: "ANDIEZ x BITI'S HUNTER",
            path: "./assets/music/music-8.mp3",
            img: "./assets/imgs/music-item-img-8.jpg",
        },
        {
            name: "Cảm Nắng",
            singer: "Suni Hạ Linh",
            path: "./assets/music/music-9.mp3",
            img: "./assets/imgs/music-item-img-9.jpg",
        },
        {
            name: "Ngỏ Lời",
            singer: "Suni Hạ Linh",
            path: "./assets/music/music-10.mp3",
            img: "./assets/imgs/music-item-img-10.jpg",
        },
    ],
    // setConfig: function (key, value) {
    //     this.config[key] = value;
    //     localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    // },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <li class="music-item${
                    index === this.currentIndex ? " active" : ""
                }" data-index="${index}">
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
        musicList.innerHTML = htmls.join("");
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
        // Xử lý CD quay / dừng
        const cdThumbAimate = cdThumb.animate(
            [{ transform: "rotate(360deg)" }],
            {
                duration: 10000, // 10 giây
                iterations: Infinity,
            }
        );

        cdThumbAimate.pause(); // Tạm dừng animation

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop =
                document.documentElement.scrollTop || window.scrollY;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        // Xử lý khi play
        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        // Khi nhạc được play
        audio.onplay = function () {
            app.isPlaying = true;
            player.classList.add("playing");
            cdThumbAimate.play();
        };

        // Khi nhạc pause
        audio.onpause = function () {
            app.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAimate.pause();
        };

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            // kiểm tra xem audio.duration có giá trị khác không để tránh chia cho 0
            if (audio.duration) {
                // audio.currentTime: Thời điểm hiện tại của audio (đơn vị: giây)
                // audio.duration: Thời lượng tổng cộng của audio (đơn vị: giây)
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
            }
        };

        // Xử lý khi tua bài hát
        progress.onchange = function (e) {
            const seekTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        };

        // Khi next bài hát
        nextBtn.onclick = function () {
            if (app.isRandom) {
                app.ranDomsong();
            } else {
                app.nextSong();
            }
            // const musicItemActive = $(".music-item.active");
            // musicItemActive.classList.remove("active");
            // const nextItem = musicItemActive.nextElementSibling;

            // if (nextItem) {
            //     nextItem.classList.add("active");
            // } else {
            //     // Nếu không có phần tử tiếp theo, thì chọn phần tử đầu tiên trong danh sách
            //     const firstItem = $(".music-item:first-child");
            //     firstItem.classList.add("active");
            // }
            audio.play();
            app.render();

            app.scrollToActiveSong();
        };
        // Khi pre bài hát
        preBtn.onclick = function () {
            if (app.isRandom) {
                app.ranDomsong();
            } else {
                app.preSong();
            }
            // const musicItemActive = $(".music-item.active");

            // musicItemActive.classList.remove("active");

            // const previousItem = musicItemActive.previousElementSibling;

            // // Nếu có phần tử trước đó, thêm class "active" cho nó
            // if (previousItem) {
            //     previousItem.classList.add("active");
            // } else {
            //     // Nếu không có phần tử trước đó, thì chọn phần tử cuối cùng trong danh sách
            //     const lastItem = $(".music-item:last-child");
            //     lastItem.classList.add("active");
            // }
            audio.play();
            app.render();

            app.scrollToActiveSong();
        };

        // Xử lý bật tắt random song
        randomBtn.onclick = function () {
            app.isRandom = !app.isRandom;
            // app.setConfig("isRandom", app.isRandom);
            randomBtn.classList.toggle("active", app.isRandom);
        };

        // Xử lý bật tắt repeat song
        repeatBtn.onclick = function () {
            app.isRepeat = !app.isRepeat;
            // app.setConfig("isRepeat", app.isRepeat);
            repeatBtn.classList.toggle("active", app.isRepeat);
        };

        // Xử lý next/replay bài hát khi audio ended
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        // Lắng nghe hành vi click vào music list
        musicList.onclick = function (e) {
            const songElement = e.target.closest(".music-item:not(.active)");
            // Xử lý khi click vào song
            if (songElement || e.target.closest(".music-item__setting")) {
                // Xử lý khi click vào song
                if (songElement) {
                    app.currentIndex = Number(songElement.dataset.index);
                    app.loadCurrentSong();
                    app.render();
                    audio.play();
                }

                // Xử lý khi click vào song option
                // if (e.target.closest(".music-item__setting")) {
                //     //
                // }
            }
        };
    },
    scrollToActiveSong: function () {
        if (this.currentIndex <= 2) {
            $(".music-item.active").scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        } else if (this.currentIndex === app.songs.length) {
            setTimeout(() => {
                $(".music-item.active").scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 200);
        } else {
            setTimeout(() => {
                $(".music-item.active").scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }, 200);
        }
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
        audio.src = this.currentSong.path;
    },
    // loadConfig: function () {
    //     this.isRandom = this.config.isRandom;
    //     this.isRepeat = this.config.isRepeat;
    // },

    // Bài hát tiếp theo
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    // Bài hát trước đó
    preSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    // Random bài hát
    ranDomsong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * app.songs.length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;

        this.loadCurrentSong();
    },

    start: function () {
        // Gán cấu hình từ config vào ứng dựng
        // this.loadConfig();

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
