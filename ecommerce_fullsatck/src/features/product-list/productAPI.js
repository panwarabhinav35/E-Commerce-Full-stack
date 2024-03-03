// A mock function to mimic making an async request for data
export function fetchAllProduct() {
  //todo Server will filter deleted products
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProductByFilter(filter, sort, pagination, admin) {
  //todo Server will filter deleted products
  let queryString = "";
  for (let key in filter) {
    const catValue = filter[key];
    if (catValue.length > 0) {
      const lastCatValue = catValue[catValue.length - 1];
      queryString += `${key}=${lastCatValue}&`;
    }
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  for (let key in sort) {
    if (key == "order") {
      continue;
    }
    queryString += `${key}=${sort[key]}&`;
  }
  if(admin){
    queryString+= `isAdmin=true`
  }
  console.log(queryString);
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();

    resolve({ data });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(
    async (resolve) => {
      const response = await fetch(
        "http://localhost:8080/products/" + update.id,
        {
          method: "PATCH",
          body: JSON.stringify(update),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      resolve({ data });
    }
    //TODO : On server it will only return some info of user
  );
}
