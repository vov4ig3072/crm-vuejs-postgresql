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
            {title: 'Рахунок', url: '/', exact: true},
            {title: 'Історія', url: '/history'},
            {title: 'Планування', url: '/planing'},
            {title: 'Новий запис', url: '/new'},
            {title: 'Категорія', url: '/category'}
        ]
    })
}
</script>