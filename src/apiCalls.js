export const getData = () => {
  return fetch('https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple')
  .then(resp => resp.json())
}
