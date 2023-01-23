<template>
    <div class="history-table ">
        <div 
            id="modal1" 
            class="modal" 
            ref="modal"
            :class="modalItem.category ? 'red darken-4 white-text' : 'green accent-3'"
        >
            <div class="modal-content">
                <p>Сумма: {{ $filters.currency(modalItem.sum)}}</p>
                <p>{{ modalItem.category ? 'Категорія витрат: ' + modalItem.category: ''}}</p>
                <p>Опис: {{ modalItem.comment}}</p>
                <p>Дата: {{ $filters.dateFilters(modalItem.date)}}</p>
            </div>
        </div>
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
                    <td>{{ (idx + 1) + (count.page * count.pageSize) - count.pageSize }}</td>
                    <td>{{ $filters.currency(item.sum) }}</td>
                    <td>{{ $filters.dateFilters(item.date) }}</td>
                    <td>{{ item.category }}</td>
                    <td > <span class="type center" :class="item.className">{{ item.type }}</span></td>
                    <td>
                        <a 
                            class="btn-small btn"
                            v-tooltip="'Відкрити деталі запису'"
                            href="#modal1"
                            @click="() =>clickHandler(item)"
                        >   
                            <i class="material-icons">open_in_new</i>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        count: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data: () => ({
        modal: null,
        modalItem: {}
    }),
    methods:{
        clickHandler(item){
            this.modal = M.Modal.init(this.$refs.modal);
            this.modalItem = {...item}
            this.modal.open()
        }
    },
    destroy() {
        if (this.modal && this.modal.destroy) {
            this.modal.destroy();
        }
    }
}
</script>