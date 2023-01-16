export default function currency(value, currency = 'UAH') {
    return new Intl.NumberFormat('ua-Ua', {
      style: 'currency',
      currency
    }).format(value)
  }