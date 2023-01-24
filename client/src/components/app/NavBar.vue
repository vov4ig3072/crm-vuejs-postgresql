<template>
    <nav class="deep-purple lighten-1 navigation">
        <div class="nav-wrapper">
            <span class="date">{{ $filters.dateFilters(date) }}</span>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li>
                    <a
                        class="dropdown-trigger btn deep-purple lighten-1 dropdown"
                        href="#"
                        data-target="dropdown1"
                        ref="drop"
                    >
                        {{ name }}
                        <i class="material-icons">keyboard_arrow_down</i>
                    </a>

                    <ul id="dropdown1" class="dropdown-content">
                        <li>
                            <router-link to="/profile" class="deep-purple-text">
                                <i class="material-icons"> assignment_ind </i>
                                {{ $filters.localize("Content_Profile") }}
                            </router-link>
                        </li>
                        <li>
                            <a
                                href="#"
                                @click.prevent="logout"
                                class="deep-purple-text"
                            >
                                <i class="material-icons">directions_run</i>
                                Вийти
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    data: () => ({
        date: new Date(),
        interval: null,
        dropDown: null,
    }),
    computed: {
        name() {
            return this.$store.getters.info.name
        },
    },
    methods: {
        logout() {
            this.$cookies
                .keys()
                .forEach((cookie) => this.$cookies.remove(cookie))
            this.$store.commit('clearInfo')
            this.$router.push('/login?message=logout')
        },
    },
    mounted() {
        this.dropDown = M.Dropdown.init(this.$refs.drop)

        this.interval = setInterval(() => {
            this.date = new Date()
        }, 1000)
    },
    destroy() {
        if (this.dropDown && this.dropDown.destroy) {
            this.dropDown.destroy()
        }
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
}
</script>
