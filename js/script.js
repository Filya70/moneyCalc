
const 
totalBalance = document.querySelector('.total__balance'),
totalMoneyIncome = document.querySelector('.total__money-income'),
totalMoneyExpenses = document.querySelector('.total__money-expenses'),
historyList = document.querySelector('.history__list'),
form = document.querySelector('#form'),
operationName = document.querySelector('.operation__name'),
operationAmount = document.querySelector('.operation__amount'),
historyItem = document.querySelector('.history__item');

let dbOperation = [
    {
        id: '1',
        description: 'Получил ',
        amount: 50000
    },
    {
        id: '2',
        description: 'Квартплата ',
        amount: -11000
    },
    {
        id: '3',
        description: 'Продукты ',
        amount: -2500
    },
    {
        id: '4',
        description: 'Купил игру ',
        amount: -1500
    },
    {
        id: '5',
        description: 'Сделал сайт',
        amount: 7000
    },
]

const renderOperation = (operation) =>{
    
    const className = operation.amount < 0 ? 'history__item-minus' : 'history__item-plus'

    const listItem = document.createElement('li')
    listItem.classList.add('history__item', className)
    listItem.innerHTML = `${operation.description}
        <span class="history__money">${operation.amount} ₽</span>
        <button class="history_delete">x</button>
    `;
    
    historyList.append(listItem)
    
    
}

const init = () =>{
    historyList.textContent = ''
    
    dbOperation.forEach(renderOperation);
}

init()