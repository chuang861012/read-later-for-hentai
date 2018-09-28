/* 設置按鈕 */
const div = document.getElementById("gd5");
const p = document.createElement("p");
const img = document.createElement("img");
const a = document.createElement("a");

p.classList.add("g2");
img.src = "https://exhentai.org/img/mr.gif";
a.href = "#";
a.textContent = " Read Later";
a.addEventListener("click", saveInfo);
div.appendChild(p);
p.appendChild(img);
p.appendChild(a);

/* 主程式 */
const title = document.getElementById("gn").textContent;
const url = document.querySelector("#gd1 div").style.backgroundImage;
let folder = url.substring(url.indexOf('"')+1); // eslint-disable-line quotes
folder = folder.substring(0,folder.indexOf('"')); // eslint-disable-line quotes
const link = location.href;

// 檢查是否已在列表
chrome.storage.sync.get(null, function (list) {
    let readAfter = list.readAfter;
    readAfter.forEach((e) => {
        if (e.link === link) {
            added();
            return;
        }
    });
    if(readAfter.length>=20){
        full();
    }
});
// 新增到列表
function saveInfo() {
    added();
    chrome.storage.sync.get(null, function (list) {
        let readAfter = list.readAfter;
        readAfter.push({
            title:title,
            img: folder,
            link:link
        });
        chrome.storage.sync.set({
            readAfter: readAfter
        });
    });
}
// 已新增的處理
function added(){
    a.textContent = " Added to Read Later";
    a.style.color = "red";
    a.removeEventListener("click",saveInfo);
}
// 列表達上限
function full(){
    a.textContent = " The list is full";
    a.style.color = "red";
    a.removeEventListener("click",saveInfo);
}