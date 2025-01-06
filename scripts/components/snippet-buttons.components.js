function editButtonTemplate() {
    return `
        <div
            class="action-bar-item action"
            onclick="editSnippet();"
        >
            <i class="fas fa-edit"></i>
        </div>
    `;
}

function saveButtonTemplate() {
    return `
        <div
            class="action-bar-item action"
            onclick="confirmEditSnippet();"
        >
            <i class="fas fa-save"></i>
        </div>
    `;
}

function deleteButtonTemplate() {
    return `
        <div
            class="action-bar-item action"
            onclick="deleteSnippet();"
        >
            <i class="fas fa-trash"></i>
        </div>
    `;
}

