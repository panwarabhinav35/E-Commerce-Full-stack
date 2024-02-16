export function addToCart(item) {
  return new Promise(
    async (resolve) => {
      const response = await fetch("http://localhost:8080/cart", {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    }
    //TODO : On server it will only return some info of user
  );
}

export function fetchItemByUserID(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user="+id);
    const data = await response.json();
    resolve({ data });
  });
}