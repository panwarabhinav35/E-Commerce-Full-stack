export function addToCart(item) {
  console.log(item)
  return new Promise(
    async (resolve) => {
      const response = await fetch("http://localhost:8080/carts", {
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
export function updateCart(update) {
  return new Promise(
    async (resolve) => {
      const response = await fetch("http://localhost:8080/carts/" + update.id, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    }
    //TODO : On server it will only return some info of user
  );
}
export function deleteItemFromCart(itemId) {
  return new Promise(
    async (resolve) => {
      const response = await fetch("http://localhost:8080/carts/" + itemId, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data: { id: itemId } });
    }
    //TODO : On server it will only return some info of user
  );
}
export function resretCart() {
  return new Promise(async (resolve) => {
    const response = await fetchItemByUserID();
    const items = response.data;
    for (let item of items) {
      // console.log(item)
      await deleteItemFromCart(item.id);
    }
    resolve({data : {status : "Success"}})
  });
}

export function fetchItemByUserID() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/carts");
    const data = await response.json();
    resolve({ data });
  });
}
