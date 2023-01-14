<template>
    <div>
        <div>
            <h4>Категорія</h4>
            <hr>
        </div>
        <div class="container-category">
            <CategoryCreate />

            <CategoryEdit />
        </div>
    </div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate'
import CategoryEdit from '../components/CategoryEdit'

export default {
    name: 'category',
    components: {
        CategoryCreate, CategoryEdit
    }
}
</script>