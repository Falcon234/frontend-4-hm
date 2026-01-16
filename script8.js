<script>
  const input = document.getElementById("bookmarkInput");
  const addBtn = document.getElementById("addBookmarkBtn");
  const list = document.getElementById("bookmarkList");

  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  function saveToLocalStorage() {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  function renderBookmarks() {
    list.innerHTML = "";

    bookmarks.forEach((url, index) => {
      const li = document.createElement("li");

      const link = document.createElement("a");
      link.href = url;
      link.textContent = url;
      link.target = "_blank";

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️";
      editBtn.onclick = () => editBookmark(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.classList.add("delete");
      deleteBtn.onclick = () => deleteBookmark(index);

      const btnGroup = document.createElement("div");
      btnGroup.append(editBtn, deleteBtn);

      li.append(link, btnGroup);
      list.appendChild(li);
    });
  }

  function addBookmark() {
    const url = input.value.trim();
    if (!url) return;

    bookmarks.push(url);
    input.value = "";
    saveToLocalStorage();
    renderBookmarks();
  }

  function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    saveToLocalStorage();
    renderBookmarks();
  }

  function editBookmark(index) {
    const newUrl = prompt("Введи новий URL:", bookmarks[index]);
    if (newUrl) {
      bookmarks[index] = newUrl;
      saveToLocalStorage();
      renderBookmarks();
    }
  }

  addBtn.addEventListener("click", addBookmark);

  renderBookmarks();
</script>
