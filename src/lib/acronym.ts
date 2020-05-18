const acronym = (text: string) => {
  return text
    .split(/\s/)
    .reduce((accumulator, word) => accumulator + word.charAt(0), '')
}

export default acronym
