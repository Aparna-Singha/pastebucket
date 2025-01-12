let querySelector = query => document.querySelector(query);

function createSnippetId() {
    return Math.random().toString(36).substring(2, 9);
}

function unloadSnippet() {
    let $activeSnippetItem = querySelector('.snippet-list .active');
    $activeSnippetItem?.classList.remove('active');

    let $snippetWindow = querySelector('.snippet');
    let selectItem = query => $snippetWindow.querySelector(query);

    let $title = selectItem('#snippet-title');
    let $content = selectItem('#snippet-code');
    let $actionBar = selectItem('.action-bar-right');

    $title.textContent = '';
    $content.value = '';
    $actionBar.innerHTML = '';

    $content.disabled = true;
}

function loadSnippet(id) {
    let $snippetWindow = querySelector('.snippet');
    let selectItem = query => $snippetWindow.querySelector(query);

    let snippetData = snippetMemory.getSnippet(id);

    let $title = selectItem('#snippet-title');
    let $content = selectItem('#snippet-code');
    let $actionBar = selectItem('.action-bar-right');

    $title.textContent = snippetData.title;
    $content.value = snippetData.content;

    let $closeButton = document.createElement('button');
    let $editButton = document.createElement('button');
    let $deleteButton = document.createElement('button');

    $actionBar.append($closeButton);
    $actionBar.append($editButton);
    $actionBar.append($deleteButton);
    
    $closeButton.outerHTML = closeButtonTemplate();
    $editButton.outerHTML = editButtonTemplate();
    $deleteButton.outerHTML = deleteButtonTemplate();

    $snippetWindow.dataset.id = id;
    $content.disabled = true;
}

function addToSnippetList(snippetId, snippetTitle) {
    let $snippetList = querySelector('.snippet-list');
    let $snippetListItem = document.createElement('div');

    $snippetList.insertBefore(
        $snippetListItem,
        $snippetList.firstChild
    );
    
    $snippetListItem.outerHTML = snippetListItemTemplate(
        snippetId,
        snippetTitle
    );
}

async function newSnippet() {
    let snippetTitle = await userPrompt();
    let snippetId = createSnippetId();

    if (!snippetTitle) return;

    let snippetData = {
        title: snippetTitle,
        content: ''
    };

    snippetMemory.saveSnippet(snippetId, snippetData);
    addToSnippetList(
        snippetId,
        snippetTitle
    );
}

function loadSnippets() {
    let allSnippetIds = snippetMemory.getAllSnippetIds();
    for (let snippetId of allSnippetIds) {
        addToSnippetList(
            snippetId,
            snippetMemory.getSnippet(snippetId).title
        );
    }
}

function openSnippet($snippetListItem) {
    let snippetId = $snippetListItem.dataset.id;

    unloadSnippet();
    loadSnippet(snippetId);

    $snippetListItem.classList.add('active');
}

function confirmEditSnippet() {
    let $snippetWindow = querySelector('.snippet');
    let snippetId = $snippetWindow.dataset.id;
    let selectItem = query => $snippetWindow.querySelector(query);

    let $title = selectItem('#snippet-title');
    let $content = selectItem('#snippet-code');

    let snippetData = {
        title: $title.querySelector('input').value,
        content: $content.value
    };

    snippetMemory.saveSnippet(snippetId, snippetData);

    let snippetListItemSelector = '.snippet-list ';
    snippetListItemSelector += `[data-id="${snippetId}"]`;

    let $snippetListItem = querySelector(snippetListItemSelector);
    $snippetListItem.textContent = snippetData.title;
    
    unloadSnippet();
    loadSnippet(snippetId);

    $snippetListItem.classList.add('active');
}

function cancelEditSnippet() {
    unloadSnippet();
    loadSnippet($snippetWindow.dataset.id);
}

function editSnippet() {
    let $snippetWindow = querySelector('.snippet');
    let snippetId = $snippetWindow.dataset.id;
    let selectItem = query => $snippetWindow.querySelector(query);

    let $title = selectItem('#snippet-title');
    let $content = selectItem('#snippet-code');
    let $actionBar = selectItem('.action-bar-right');

    $actionBar.innerHTML = '';

    let $saveButton = document.createElement('button');
    $actionBar.append($saveButton);
    $saveButton.outerHTML = saveButtonTemplate();

    let snippetData = snippetMemory.getSnippet(snippetId);

    $title.innerHTML = `
        <input
            type="text"
            id="snippet-title"
            value="${snippetData.title}"
            maxlength="30"
        >
    `;
    
    $content.disabled = false;
    $title.querySelector('input').focus();
}

function deleteSnippet() {
    let $snippetWindow = querySelector('.snippet');
    let snippetId = $snippetWindow.dataset.id;

    snippetMemory.deleteSnippet(snippetId);

    let snippetListItemSelector = '.snippet-list ';
    snippetListItemSelector += `[data-id="${snippetId}"]`;

    let $snippetListItem = querySelector(snippetListItemSelector);
    $snippetListItem.remove();

    unloadSnippet();
}

