export default function getCategoryColor(category) {
  switch (category.toLowerCase()) {
    case 'for work':
      return 'purple';
    case 'for health':
      return 'green';
    case 'for harmony':
      return 'pink';
    default:
      return '';
  }
}
