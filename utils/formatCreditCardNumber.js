export default function formatCreditCardNumber(number) {
  const formattedNumber = number.replace(/\s/g, ''); // Remove any spaces
  const chunkSize = 4;
  const numChunks = Math.ceil(formattedNumber.length / chunkSize);
  const chunks = [];

  for (let i = 0; i < numChunks; i++) {
    const startIndex = i * chunkSize;
    const chunk = formattedNumber.slice(startIndex, startIndex + chunkSize);
    chunks.push(chunk);
  }

  return chunks.join(' ');
}
