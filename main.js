
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let search = document.getElementById('search');












//get total
function gettotal() {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    if (price.value !="") {
        total.innerHTML = result;
        total.style.backgroundColor = "yellow";
        total.style.color = "black";
        
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "red";
    }
     
};

//create
let product;
if (localStorage.mypro != null) {


 product = JSON.parse(localStorage.mypro);
    
} else {
    
     product = [];
};
create.onclick = function createproduct() {
    if (title.value != '' && category.value != '' && count.value < 200) {
         let proobj = {
        "title": title.value.toLowerCase() ,
        "price": price.value ,
        "taxes": taxes.value ,
        "ads": ads.value ,
        "discount": discount.value ,
        "total": total.innerHTML,
        "count":count.value,
        "category": category.value.toLowerCase() ,
    }
    //count
    if (proobj.count > 1 ) {
        for (let i = 0; i < proobj.count; i++){
            
            product.push(proobj);
        }
    } else {
        
        product.push(proobj);
    }
    total.style.backgroundColor = "red";
    localStorage.setItem('mypro', JSON.stringify(product));
    cleardata();
    showdata();
        
    }
   
    
   
}



//clear data
function cleardata() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    category.value = "";
    count.value = "";
       
}
//read
showdata();
function showdata() {
    table = '';
    for (let i = 0; i < product.length;i++){
        table += `
        <tr>
        <td>${i+1}</td>
                        <td>${product[i].title}</td>
                        <td>${product[i].price}</td>
                        <td>${product[i].taxes}</td>
                        <td>${product[i].ads}</td>
                        <td>${product[i].discount}</td>
                        <td>${product[i].total}</td>
                        <td>${product[i].category}</td>
                        <th><button onclick="updatepro(${i})" id="update">update</button></th>
                        <th><button onclick="deletepro(${i})" id="delete">delete</button></th>
                        </tr>`;
                        
                    }
                    document.getElementById('tbody').innerHTML = table;
                    if (product.length > 0) {
    deleall = `<button onclick="deleteall()" id="deleteall">DELETE ALL ( ${product.length} )</button>`;
        document.getElementById('deleteall').innerHTML = deleall;
    
    } else {
        document.getElementById('deleteall').innerHTML = '';
    };

    
};



//delete
function deletepro(i) {
    product.splice(i, 1);
    localStorage.mypro = JSON.stringify(product);
    showdata();
    
};





function deleteall() { 
    
    product = [];
    localStorage.mypro = JSON.stringify(product);
    showdata();
    console.log(product);
};


//update
function updatepro(i) {
    title.value = product[i].title;
    price.value = product[i].price;
    taxes.value = product[i].taxes;
    ads.value = product[i].ads;
    discount.value = product[i].discount;
    category.value = product[i].category;
    total.innerHTML = product[i].total;
    total.style.backgroundColor = "yellow";
    scroll({
        top: 0,
        behavior:"smooth",
    })

    product.splice(i, 1);
    localStorage.mypro = JSON.stringify(product);
    showdata();
    
};

//search
 let modesearch = "search by title";

function searching(value) {
    let table = '';
    if (modesearch == "search by title") {
        for (i = 0; i < product.length; i++){
            if (product[i].title.includes(value.toLowerCase())) {

                table += `
        <tr>
        <td>${i+1}</td>
                        <td>${product[i].title}</td>
                        <td>${product[i].price}</td>
                        <td>${product[i].taxes}</td>
                        <td>${product[i].ads}</td>
                        <td>${product[i].discount}</td>
                        <td>${product[i].total}</td>
                        <td>${product[i].category}</td>
                        <th><button onclick="updatepro(${i})" id="update">update</button></th>
                        <th><button onclick="deletepro(${i})" id="delete">delete</button></th>
                        </tr>`;
                
                
            }
        }
        
    } else {
         for (i = 0; i < product.length; i++){
            if (product[i].category.includes(value.toLowerCase())) {

                table += `
        <tr>
        <td>${i+1}</td>
                        <td>${product[i].title}</td>
                        <td>${product[i].price}</td>
                        <td>${product[i].taxes}</td>
                        <td>${product[i].ads}</td>
                        <td>${product[i].discount}</td>
                        <td>${product[i].total}</td>
                        <td>${product[i].category}</td>
                        <th><button onclick="updatepro(${i})" id="update">update</button></th>
                        <th><button onclick="deletepro(${i})" id="delete">delete</button></th>
                        </tr>`;
                
                
            }
        }
        
    }
    document.getElementById('tbody').innerHTML = table;
   
};
    









   
    function searchmoding(id) {
        if (id =="searchtitle") {
          modesearch = "search by title";
        search.placeholder = 'search by title';
        
        
    } else {
            modesearch = "search by cat";
            search.placeholder = "search by category";
            
        
    }

        search.focus();
        search.value = '';
        showdata();


};



//clean data

//go to top 
function goToTop() {
     scroll({
        top: 0,
        behavior: "smooth",
    });
   
    // لصفحات XHTML
}

// جعل الزر مرئي عند التمرير إلى الأسفل
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}