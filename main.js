let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("btnCreate");
let clearAll = document.getElementById("deleteAll");
let search = document.getElementById("search");
let tbody = document.getElementById("tbody");
let wrongInps = document.getElementById("wrongInps");
let mood = "create";
let tmp;
//count the total 
function getTotal() {
     if (price.value != '') {
          let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
          total.innerHTML = result;
          total.style.backgroundColor = "green";
     } else {
          total.innerHTML = "";
          total.style.backgroundColor = "rgb(95, 74, 164)";
     }
}
//create the product 
let dataPro;
if (localStorage.products != null) {
     dataPro = JSON.parse(localStorage.products);
} else {
     dataPro = [];
}

submit.onclick = function () {
     let newPro = {
          title: title.value.toLowerCase(),
          price: price.value,
          taxes: taxes.value,
          ads: ads.value,
          discount: discount.value,
          total: total.innerHTML,
          count: count.value,
          category: category.value.toLowerCase()
     }
     if (newPro.title != "" && newPro.price != "" && newPro.category != "" && newPro.count <= 100) {
          if (mood === "create") {
               if (newPro.count > 1) {
                    for (let i = 0; i < newPro.count; i++) {
                         dataPro.push(newPro);

                    }

               } else {
                    dataPro.push(newPro);

               }
          } else {
               dataPro[tmp] = newPro;
               count.style.display = "block";
               submit.innerHTML = "Create";
               clearAll.style.display = "block";
               mood = "create";

          }
          clearInp();
          wrongInps.innerHTML = "";
          title.style.border = "none";
          price.style.border = "none";
          category.style.border = "none";
     } else {
          wrongInps.innerHTML = `you didn't fill the  " title " , " price " , " category " fields ,
          or entered more than 100 in the " count " !`;
          title.style.border = "1px solid red";
          price.style.border = "1px solid red";
          category.style.border = "1px solid red";

     }
     //localStorage save
     localStorage.products = JSON.stringify(dataPro);
     total.style.backgroundColor = "rgb(95, 74, 164)";
     showData();
}
//clear inputs
function clearInp() {
     title.value = "";
     price.value = "";
     taxes.value = "";
     ads.value = "";
     discount.value = "";
     total.innerHTML = "";
     count.value = "";
     category.value = "";
}
//show data 
function showData() {
     let table = "";
     for (let i = 0; i < dataPro.length; i++) {
          table += `<tr>
          <td data-cell="id">${i}</td>
          <td data-cell="title">${dataPro[i].title}</td>
          <td data-cell="price">${dataPro[i].price}</td>
          <td data-cell="taxes">${dataPro[i].taxes}</td>
          <td data-cell="ads">${dataPro[i].ads}</td>
          <td data-cell="discount">${dataPro[i].discount}</td>
          <td data-cell="total">${dataPro[i].total}</td>
          <td data-cell="category">${dataPro[i].category}</td>
          <td><button onclick = "updateData(${i})">update</button></td>
          <td><button onclick ="deleteData(${i})">delete</button></td>
        </tr>`;
     }
     tbody.innerHTML = table;
     if (dataPro.length > 0) {
          clearAll.innerHTML = `<button onclick = "deleteAll()">delete All (${dataPro.length})</button>`;

     } else {
          clearAll.innerHTML = "";
     }

}

showData();
//delete data 
function deleteData(i) {
     dataPro.splice(i, 1);
     localStorage.products = JSON.stringify(dataPro)
     showData();
}
//delete all data 
function deleteAll() {
     localStorage.clear();
     dataPro.splice(0);
     showData();


}
//update
function updateData(i) {
     title.value = dataPro[i].title;
     price.value = dataPro[i].price;
     taxes.value = dataPro[i].taxes;
     ads.value = dataPro[i].ads;
     discount.value = dataPro[i].discount;
     category.value = dataPro[i].category;
     getTotal();
     count.style.display = "none";
     submit.innerHTML = "Update";
     mood = "update";
     tmp = i;
     scroll({ top: 0, behavior: "smooth" });
     clearAll.style.display = "none";

}
//search
let searchMode = "title";
function getSearchMode(id) {

     if (id === "srchTitle") {
          searchMode = "title";
     } else {
          searchMode = "category";
     }
     search.focus();
     search.placeholder = `search by ${searchMode}`;
     search.value = "";
     showData();
}
function searchData(value) {
     let table = "";
     for (let i = 0; i < dataPro.length; i++) {
          if (searchMode === "title") {
               if (dataPro[i].title.includes(value.toLowerCase())) {
                    table += `<tr>
          <td data-cell="id">${i}</td>
          <td data-cell="title">${dataPro[i].title}</td>
          <td data-cell="price">${dataPro[i].price}</td>
          <td data-cell="taxes">${dataPro[i].taxes}</td>
          <td data-cell="ads">${dataPro[i].ads}</td>
          <td data-cell="discount">${dataPro[i].discount}</td>
          <td data-cell="total">${dataPro[i].total}</td>
          <td data-cell="category">${dataPro[i].category}</td>
          <td><button onclick = "updateData(${i})">update</button></td>
          <td><button onclick ="deleteData(${i})">delete</button></td>
        </tr>`;

               }
          } else {
               if (dataPro[i].category.includes(value.toLowerCase())) {
                    table += `<tr>
          <td data-cell="id">${i}</td>
          <td data-cell="title">${dataPro[i].title}</td>
          <td data-cell="price">${dataPro[i].price}</td>
          <td data-cell="taxes">${dataPro[i].taxes}</td>
          <td data-cell="ads">${dataPro[i].ads}</td>
          <td data-cell="discount">${dataPro[i].discount}</td>
          <td data-cell="total">${dataPro[i].total}</td>
          <td data-cell="category">${dataPro[i].category}</td>
          <td><button onclick = "updateData(${i})">update</button></td>
          <td><button onclick ="deleteData(${i})">delete</button></td>
        </tr>`;

               }
          }

     }
     tbody.innerHTML = table;

}