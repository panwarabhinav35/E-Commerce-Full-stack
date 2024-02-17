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
export function updateCart(update) {
  return new Promise(
    async (resolve) => {
      const response = await fetch("http://localhost:8080/cart/" + update.id, {
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
      const response = await fetch("http://localhost:8080/cart/" + itemId, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data: { id: itemId } });
    }
    //TODO : On server it will only return some info of user
  );
}
export function resretCart(userID) {
  return new Promise(async (resolve) => {
    const response = await fetchItemByUserID(userID);
    const items = response.data;
    for (let item of items) {
      console.log(item)
      await deleteItemFromCart(item.id);
    }
    resolve({data : {status : "Success"}})
  });
}

export function fetchItemByUserID(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + id);
    const data = await response.json();
    resolve({ data });
  });
}
