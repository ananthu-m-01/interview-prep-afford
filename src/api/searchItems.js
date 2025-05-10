import dummyData from "../data/dummyData";

const searchItems = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = dummyData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(result);
    }, 300);
  });
};

export default searchItems;
