document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.todo');
    todo(container);
})

function todo(container) {
    container.innerHTML = `
        <h2>ToDo</h2>
        <ul></ul>
        <h3>0 Done</h3>
        <form>
            <input type="text" name="text" />
            <button type="submit">Add</button>
        </form>
    `;

    const form = container.querySelector('form');
    const list = container.querySelector('ul');
    const done = container.querySelector('h3');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    })
}