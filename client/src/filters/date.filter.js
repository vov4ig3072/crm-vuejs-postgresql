export default function dateFilters(value){
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour:"numeric",
        minute: "numeric",
        second: "numeric"
    }
        
    return new Intl.DateTimeFormat('ua-UA', options).format(value)
}