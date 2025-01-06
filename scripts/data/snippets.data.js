function tokenize(key) {
    return `code-snippy-${key}`;
}

function localSave(id, data) {
    localStorage.setItem(
        tokenize(id),
        JSON.stringify(data)
    );
}

function localDelete(id) {
    localStorage.removeItem(
        tokenize(id)
    );
}

function localLoad(id, defaultValue=null) {
    let data = localStorage.getItem(tokenize(id));
    return data === null ? defaultValue : JSON.parse(data);
}

function loadSnippetMemory() {
    let snippetData = {};
    let snippetIds = localLoad('id-list', []);

    function getAllSnippetIds() {
        return snippetIds;
    }
    
    function getSnippet(id) {
        if (!snippetData[id]) {
            snippetData[id] = localLoad(`snippet-${id}`);
        }

        return !snippetIds.includes(id) ? null : {
            ...snippetData[id]
        };
    }
    
    function saveSnippet(id, data) {
        snippetData[id] = data;

        if (!snippetIds.includes(id)) {
            snippetIds.push(id);
            localSave('id-list', snippetIds);
        }

        localSave(`snippet-${id}`, data);
    }
    
    function deleteSnippet(id) {
        if (!snippetIds.includes(id)) return;

        snippetIds = snippetIds.filter(sId => sId !== id);
        delete snippetData[id];

        localDelete(`snippet-${id}`);
        localSave('id-list', snippetIds);
    }

    return {
        getAllSnippetIds,
        getSnippet,
        saveSnippet,
        deleteSnippet
    }
}

var snippetMemory = loadSnippetMemory();

