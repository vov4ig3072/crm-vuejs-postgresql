export default {
    mounted(el, {value}){
        console.log(el);
        M.Tooltip.init(el, {html: value, position: 'top'})
    },
    beforeUnmount(el){
        const tooltip = M.Tooltip.getInstance(el)

        if(tooltip && tooltip.destroy){
            tooltip.destroy()
        }
    }
}