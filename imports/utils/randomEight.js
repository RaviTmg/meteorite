const random5 = () => Math.random() * 5;

const randomEight = () => {
  const randFive = random5();
  const randEight = (randFive * 8) / 5;
  return { randFive, randEight };
};
export default randomEight;
