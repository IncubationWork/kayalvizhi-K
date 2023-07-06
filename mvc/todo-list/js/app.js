//import Store from './store';

class Store {
    constructor(name, callback) {
        const localStorage = window.localStorage;
        let liveTodos;
		this.getLocalStorage = () => {
			return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');
		};
        this.setLocalStorage = (todos) => {
			localStorage.setItem(name, JSON.stringify(liveTodos = todos));
		};

		if (callback) {
			callback();
		}

    }

    find(query, callback) {
		const todos = this.getLocalStorage();
		let k;
        console.log("Todos" +todos);
        console.log("Query"+query);

		callback(todos.filter(todo => {
			for (k in query) {
				if (query[k] !== todo[k]) {
					return false;
				}
			}
			return true;
		}));
	}
}

const store = new Store('todos-vanilla-es6');