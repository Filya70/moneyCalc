
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


const generateId = () => `i${Math.round(Math.random()*1e8).toString(16)}`

const renderOperation = (operation) =>{
    
    const className = operation.amount < 0 ? 'history__item-minus' : 'history__item-plus'

    const listItem = document.createElement('li')
    listItem.classList.add('history__item', className)
    listItem.innerHTML = `${operation.description}
        <span class="history__money">${operation.amount} ₽</span>
        <button class="history_delete" data-id="${operation.id}">x</button>
    `;
    
    historyList.append(listItem)
    
    
}

const updateBalance = () =>{
    const resultIncome = dbOperation
        .filter((item) => item.amount > 0)
        .reduce((acc, item) => acc+item.amount, 0)

    const resultExpenses = dbOperation
        .filter((item) => item.amount < 0)
        .reduce((acc, item) => acc+item.amount, 0)
    
    totalMoneyIncome.textContent = resultIncome + ' ₽'
    totalMoneyExpenses.textContent = resultExpenses + ' ₽'
    totalBalance.textContent = (resultIncome + resultExpenses) + ' ₽'
    
}

const addOperation = (e) =>{
    e.preventDefault()
    const operationNameValue = operationName.value,
        operationAmountValue = operationAmount.value;

        if(operationNameValue.trim() !== '' && operationNameValue.trim() !== ''){

            const operation ={
                id: generateId(),
                description: operationName.value,
                amount: +operationAmount.value
            }

            dbOperation.push(operation)

            init()

            operationName.value = ''
            operationAmount.value = ''
        }
}

const deleteOperation = (e) =>{
    let target = e.target
    if(target.classList.contains('history_delete')){
        dbOperation = dbOperation
        .filter(item => item.id !== target.dataset.id)        
    }

    init()
}

const init = () =>{
    historyList.textContent = ''
    
    dbOperation.forEach(renderOperation);
    updateBalance()
}

form.addEventListener('submit', addOperation)

historyList.addEventListener('click', deleteOperation)

init()