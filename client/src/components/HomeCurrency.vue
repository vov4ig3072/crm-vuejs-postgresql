<template>
    <div class="home-content__currency purple lighten-3">
        <h4>Курс Валют</h4>
        <table>
            <thead>
                <tr>
                    <th>Валюта</th>
                    <th>Курс</th>
                    <th>Дата</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="key in this.rate" :key=key.cc>
                    <td>{{ key.cc }}</td>
                    <td>{{ key.rate.toFixed(2) }}</td>
                    <td>{{ key.exchangedate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default{
    name: 'home-carrency',
    props: ['rate']
}
</script>