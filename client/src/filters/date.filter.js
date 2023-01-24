import store from '../store'


export default function dateFilters(value){
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour:"numeric",
        minute: "numeric",
        second: "numeric"
    }
    
    return new Intl.DateTimeFormat(store.getters.info.locale || 'ua-UA', options).format(value).replace('о', '')
}