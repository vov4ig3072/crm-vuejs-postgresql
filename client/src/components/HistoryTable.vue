<template>
    <div class="history-table ">
        <table >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Сумма</th>
                    <th>Дата</th>
                    <th>Категорія</th>
                    <th>Тип</th>
                    <th>Відкрити</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,idx) in list" :key="item.date">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ $filters.currency(item.sum) }}</td>
                    <td>{{ $filters.dateFilters(item.date) }}</td>
                    <td>{{ item.category }}</td>
                    <td > <span class="type center" :class="item.className">{{ item.type }}</span></td>
                    <td>
                        <button 
                            class="btn-small btn"
                            v-tooltip="'Відкрити деталі запису'"
                            @click="$router.push('/detail/' + item.id)"
                        >   
                            <i class="material-icons">open_in_new</i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props:{
        list:{
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>