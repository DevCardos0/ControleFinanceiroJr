const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const list = document.getElementById("transaction-list");
const balanceDisplay = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function calculateBalance() {
  const total = transactions.reduce((acc, item) => acc + item.amount, 0);
  balanceDisplay.textContent = `R$ ${total.toFixed(2)}`;
}

function renderTransactions() {
  list.innerHTML = "";
  transactions.forEach((transaction, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${transaction.description}
      <span>
        R$ ${transaction.amount.toFixed(2)}
        <button onclick="removeTransaction(${index})">X</button>
      </span>
    `;
    list.appendChild(li);
  });
  calculateBalance();
}

function addTransaction(e) {
  e.preventDefault();

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (!description || isNaN(amount)) return;

  transactions.push({ description, amount });

  updateLocalStorage();
  renderTransactions();

  descriptionInput.value = "";
  amountInput.value = "";
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  updateLocalStorage();
  renderTransactions();
}

form.addEventListener("submit", addTransaction);

renderTransactions();