
import fetch from 'node-fetch';

const token = '4aedfaef19b1d25166822557e4768f3ffccbd6f39c913113080fb21a77187a2ee9896e7753f9820091f30f1f659e11509977b0d9d382e4be5fef5f7f232946bf';

// Ниже опеределяется запрос как multi-line string
// Также, возможно хранение запросов отдельно от кода
const query = `
mutation ($message: String!, $chat_id: ID!) { # Определение переменных, используемых в запросе (input)
    newMessages2(chat_id: $chat_id, input: { text_message: { message: $message } })  # Передача переменных в аргументы поля (input)
  {  
 edges{node{id}} 
  }
}`;
// Определение переменных, которые будут использоваться далее в запросе
const variables = {
    chat_id: "bc350289-4e98-4d5d-8a94-f2e78603769f",
    message: `hello world`
};

// Определение параметров XHR запроса
const url = 'https://api-dev.ppl.do/graphql',
    options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

// Выполнение XHR запроса
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}


function handleData(data) {
    console.log(data);
    console.log("id last message =" , data.data.newMessages2.edges);
    console.table("id last message =" ,data.data.newMessages2.edges.node.id );
}

function handleError(error) {
    console.log('Ошибка, результат в консоли');
    console.error(error);
}
