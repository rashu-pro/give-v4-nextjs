export default function numberFormat(str){
  // Remove any non-digit characters from the string
  str = str.replace(/[^0-9]/g, '');
  return str;
}
