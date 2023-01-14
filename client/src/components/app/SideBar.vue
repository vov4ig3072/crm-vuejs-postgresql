<template>
    <ul class="sidenav app-sidenav" >
        <router-link
            v-for="link in links"
            :key="link.url"
            tag="li"
            class="app-sidenav__list-item waves-effect waves-blue pointer"
            active-class="active"
            :to="link.url"
            :exact="link.exact"
        >
            {{link.title}}
        </router-link>
      
    </ul>
</template>

<script>
export default {
    data: () => ({
        links: [
            {title: 'Score', url: '/', exact: true},
            {title: 'History', url: '/history'},
            {title: 'Planing', url: '/planing'},
            {title: 'New entry', url: '/new'},
            {title: 'Category', url: '/category'}
        ]
    })
}
</script>