let orderDetails = document.getElementsByClassName("input")

let orderBtn = document.getElementById("button")
let order = {}
orderBtn.addEventListener("click", () => {
    Array.from(orderDetails).forEach(e => order = { ...order, [e.name]: e.value })
    axios.get('https://crudcrud.com/api/1fdac987157546fe8a9772f6a701eee3/orderTable').then(data => {
        let arr = data.data
        arr.forEach(obj => {
            if (obj.table == order.table) {
                axios.delete(`https://crudcrud.com/api/1fdac987157546fe8a9772f6a701eee3/orderTable/${obj._id}`)
            }
        })
    })
    axios.post('https://crudcrud.com/api/1fdac987157546fe8a9772f6a701eee3/orderTable', order)
    alert("your order has been placed")

})
let checkOrderBtn = document.getElementById('checkOrder')
checkOrderBtn.addEventListener("click", () => {
    document.getElementById("Table1").innerHTML = ""
    document.getElementById("Table2").innerHTML = ""
    document.getElementById("Table3").innerHTML = ""
    axios.get('https://crudcrud.com/api/1fdac987157546fe8a9772f6a701eee3/orderTable').then(data => {
        let arr = data.data
        arr.forEach(obj => {
            let table = document.getElementById(`${obj.table}`)
            let ul = document.createElement("ul")
            let li = document.createElement("li")
            li.textContent = `${obj.price}-${obj.dish}`
            let deleteBtn = document.createElement("button")
            deleteBtn.textContent = "Delete Order"
            ul.appendChild(li)
            table.appendChild(ul)
            ul.appendChild(deleteBtn)
            deleteBtn.addEventListener("click", (e) => {
                axios.delete(`https://crudcrud.com/api/1fdac987157546fe8a9772f6a701eee3/orderTable/${obj._id}`)
                e.target.parentNode.remove()
            })
        })
    })


})
