export class Search {
    constructor(view, log, api) {
        this.view = view;
        this.log = log;
        this.api = api;

        this.currentUserPage = 1;
        this.showUserCount = 0;

        this.view.searchInput.addEventListener('keyup', this.debounce(this.searchUsers.bind(this),
            500));
        this.view.userLoadMoreBtn.addEventListener('click', () => this.loadMoreUsers())
    }

    setCurrentUsersPage(number) {
        this.currentUserPage = number;
    }

    setShowUsersCount(number) {
        this.showUserCount = number;
    }

    loadMoreUsers() {
        this.loadUsers();
    }

    async searchUsers() {
        if (this.view.searchInput.value.length) {
            this.setCurrentUsersPage(1);
            this.setShowUsersCount(0);
            this.view.clearList();
            this.loadUsers();
        } else {
            this.view.clearList();
        }
    }

    loadUsers() {
        this.api.searchUsers(this.view.searchInput.value, this.currentUserPage).then(
            res => {
                const users = res.items;
                this.setShowUsersCount(this.showUserCount + users.length);
                this.setCurrentUsersPage(this.currentUserPage + 1);
                this.view.showCountMessage(this.log.countMessage(res.total_count))
                this.view.toggleViewUserLoadMoreBtn(this.showUserCount < res.total_count &&
                    this.showUserCount !== res.total_count);
                users.forEach((user) => this.view.createPrevUser(user))
            }
        )
    }

    debounce(func, wait, immediate) {
        let timeout;

        return function executedFunction() {
            const context = this;
            const args = arguments;

            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            const callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

            if (callNow) func.apply(context, args);
        };
    };
}

