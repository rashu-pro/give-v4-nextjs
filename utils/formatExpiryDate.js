export default function formatExpiryDate(str){
  // Remove any non-digit characters from the string
  str = str.replace(/[^0-9]/g, '');

  // Insert a slash after every two digits
  let newStr = "";
  for (let i = 0; i < str.length; i += 2) {
    newStr += str.slice(i, i + 2) + "/";
  }

  // Remove the extra slash at the end
  newStr = newStr.slice(0, -1);

  return newStr;
}
