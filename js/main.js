let backgroundRandom;
let head = document.querySelector("header")
let chossen = "yes"

let about = document.querySelector(".about")
let aboutImage = document.querySelector(".about .image")
let aboutH = document.querySelector(".about .text h2")
let aboutP = document.querySelector(".about .text p")
let skills = document.querySelector(".our-skills")
let progress = document.querySelectorAll(".our-skills .skill .progress span")
let ulLis = document.querySelectorAll("header .nav li")

ulLis.forEach((lis) => {
    lis.addEventListener("click", (li) => {
        ulLis.forEach((lis) => {
            lis.classList.remove("active")
        })
        li.currentTarget.classList.add("active")
    })
})

window.onscroll = function () {
    if (window.scrollY > 1) {
        head.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
    }else {
        head.style.backgroundColor = "unset"
    }
    if (window.scrollY >= about.offsetTop - 500) {
        aboutImage.style.cssText = "animation: thing 0.5s forwards linear;"
        aboutH.style.cssText = "animation: thing 0.5s forwards linear 0.5s;"
        aboutP.style.cssText = "animation: thing 1s forwards linear 1s;"
    }else {
        aboutImage.style.cssText = "transform: translateX(-100%);"
        aboutH.style.cssText = "transform: translateX(100%);"
        aboutP.style.cssText = "transform: translateY(100px);"
    } 
    if (window.scrollY >= skills.offsetTop - 500) {
        progress.forEach((prog) => {
            prog.style.width = prog.dataset.progress
        })
    }else {
        progress.forEach((prog) => {
            prog.style.width = "0"
        })
    }
    ulLis.forEach((lis) => {
        let sec = document.querySelector(`${lis.dataset.class}`)
        if (window.scrollY >= sec.offsetTop - 200) {
            ulLis.forEach((li) => {
                li.classList.remove("active")
            })
            lis.classList.add("active")
        }
    })
}

let land = document.querySelector(".landing")

let imgs = ["img(1).jpg", "img(2).jpg", "img(3).jpg"]

function random() {
    if (chossen === "yes") {
        backgroundRandom = setInterval(() => {
            let img = Math.floor(Math.random() * imgs.length)
            land.style.backgroundImage = 'url("images/' + imgs[img] + '")'
        }, 10000);
    }else if (chossen === "no") {
        clearInterval(backgroundRandom)
    }
}

let setting = document.querySelector(".setting-box")
let settingIcon = document.querySelector(".setting-box .icon")
let settingI = document.querySelector(".setting-box .icon i")

settingIcon.onclick = function () {
    setting.classList.toggle("setting-show")
    settingI.classList.toggle("anime")
}

let colors = document.querySelectorAll(".setting-box .option .colors span")

colors.forEach((color) => {
    color.addEventListener("click", (ele) => {
        colors.forEach((el) => {
            el.classList.remove("active")
        })
        ele.currentTarget.classList.add("active")
        document.documentElement.style.setProperty("--main-color", ele.currentTarget.dataset.color)
        window.localStorage.setItem("color", ele.currentTarget.dataset.color)
    })
})
if (window.localStorage.getItem("color")) {
    colors.forEach((color) => {
        if (color.dataset.color == window.localStorage.getItem("color")) {
            color.classList.add("active")
        }
    })
    document.documentElement.style.setProperty("--main-color", window.localStorage.getItem("color"))
}

let yesNo = document.querySelectorAll(".setting-box .random .chosse span")
let imageBox = document.querySelector(".setting-box .random .image-box") 
let imageBoxImage = document.querySelectorAll(".setting-box .random .image-box img") 



if (window.localStorage.getItem("chossen")) {
    yesNo.forEach((ele) => {
        if (window.localStorage.getItem("chossen") == ele.dataset.back) {
            ele.classList.add("active")
        }else {
            ele.classList.remove("active")
        }
    })
    if (window.localStorage.getItem("chossen") == "no") {
        imageBox.style.display = "block"
        if (window.localStorage.getItem("img")) {
            imageBoxImage.forEach((img) => {
                img.classList.remove("active")
                if (window.localStorage.getItem("img") == img.dataset.img) {
                    img.classList.add("active")
                }
            })
            land.style.backgroundImage = "url('" + window.localStorage.getItem("img") + "')"
        }
    }else {
        imageBox.style.display = "none"
    } 
    chossen = window.localStorage.getItem("chossen")
    random()
}
yesNo.forEach((ele) => {
    ele.addEventListener("click", (el) => {
        yesNo.forEach((e) => {
            e.classList.remove("active")
        })
        window.localStorage.setItem("chossen", el.currentTarget.dataset.back)
        if (el.currentTarget.dataset.back == "no") {
            imageBox.style.display = "flex"
        }else {
            imageBox.style.display = "none"
            imageBoxImage.forEach((ele) => {
                ele.classList.remove("active")
            })
        } 
        chossen = el.currentTarget.dataset.back
        random()
        el.currentTarget.classList.add("active")
    })
})
imageBoxImage.forEach((image) => {
    image.addEventListener("click", (img) => {
        imageBoxImage.forEach((ele) => {
            ele.classList.remove("active")
        })
        img.currentTarget.classList.add("active")
        window.localStorage.setItem("img", img.currentTarget.dataset.img)
        land.style.backgroundImage = "url('" + img.currentTarget.dataset.img +"')"
    })
})

let overly = document.querySelector(".overly")
let overlyImg = document.querySelector(".overly .overly-box img")
let gallImgs = document.querySelectorAll(".gallery .box-images img")
let overlyClose = document.querySelector(".overly .overly-box .close")

gallImgs.forEach((imgs) => {
    imgs.addEventListener("click", (img) => {
        overly.style.display = "flex"
        overlyImg.src = img.currentTarget.src
    })
})
overlyClose.onclick = function () {
    overly.style.display = "none"
}
let reset = document.querySelector(".setting-box .reset")
reset.onclick = function () {
    chossen = "yes";
    random()
    colors.forEach((color) => {
        color.classList.remove("active")
    })
    colors[0].classList.add("active")
    yesNo[0].classList.add("active")
    yesNo[1].classList.remove("active")
    imageBox.style.display = "none"
    imageBoxImage.forEach((img) => {
        img.classList.remove("active")
    })
    document.documentElement.style.setProperty("--main-color", "#ff9800")
    window.localStorage.clear()
}