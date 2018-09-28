/* 設置按鈕 */
const div = document.getElementById("info").lastElementChild;
const btn = document.createElement("a");
btn.innerHTML = "<i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Add to Read Later";
btn.classList.add("btn");
btn.classList.add("btn-secondary");
btn.addEventListener("click", saveInfo);
div.appendChild(btn);

/* 主程式 */
const title = document.getElementById("info").firstElementChild.textContent;
const folder = document.querySelector("#cover a img").src;
const link = location.href;
// 檢查是否已在列表
chrome.storage.sync.get(null, (list) => {
    let readAfter = list.readAfter;
    readAfter.forEach((e) => {
        if (e.link === link) {
            added();
            return;
        }
    });
    if (readAfter.length >= 20) {
        full();
    }
});
// 新增到列表
function saveInfo() {
    added();
    chrome.storage.sync.get(null, (list) => {
        let readAfter = list.readAfter;
        readAfter.push({
            title: title,
            img: folder,
            link: link
        });
        chrome.storage.sync.set({
            readAfter: readAfter
        });
    });
}
// 已新增的處理
function added() {
    btn.textContent = "Added to Read Later";
    btn.style.backgroundColor = "green";
    btn.removeEventListener("click", saveInfo);
}
// 列表達上限
function full() {
    btn.textContent = " The list is full";
    btn.style.backgroundColor = "red";
    btn.removeEventListener("click", saveInfo);
}