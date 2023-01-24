import store from '../store'
import ua from '../locales/ua.json'
import en from '../locales/en.json'

const localeContent = {
    'ua-UA': ua,
    'en-US': en
}

export default function localiza(key){
    return localeContent[store.getters.info.locale || 'ua-UA'][key] || '[Localize error]'
}