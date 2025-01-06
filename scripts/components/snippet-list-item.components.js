function snippetListItemTemplate(id, title) {
    let layout = `
        <div
            class="snippet-list-item"
            id="snippet-list-item-${id}"
            data-id="${id}"
            onclick="openSnippet(this);"
        >
            <div class="snippet-list-left">
                <div class="snippet-list-item-item">
                    <span class="snippet-list-item-title">
                        ${title}
                    </span>
                </div>
            </div>

            <div class="snippet-list-right"></div>
        </div>
    `;

    return layout;
}

