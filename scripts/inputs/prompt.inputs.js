function userPrompt(message="") {
    return new Promise((res) => {
        let promptResponse = prompt(message);
        
        if (!promptResponse) {
            res(null);
            return;
        }

        res(promptResponse);
    });
}

