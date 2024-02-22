document.addEventListener("DOMContentLoaded", function() {
    // Fetch the Markdown file
    fetch('example.md')
        .then(response => response.text())
        .then(markdown => {
            // Convert Markdown to HTML using Showdown
            const converter = new showdown.Converter();
            const html = converter.makeHtml(markdown);

            // Inject the HTML content into the DOM
            document.getElementById('markdownContent').innerHTML = html;
        })
        .catch(error => console.error('Error fetching Markdown:', error));
});