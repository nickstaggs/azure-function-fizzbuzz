const config = require('./config.json');

module.exports = async function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');
    context.res.headers = { 'Content-Type': 'text/html; charset=utf-8'};

    if (req.query.n) {
        var possibleInt = parseInt(req.query.n)
        if (!Number.isNaN(possibleInt)) {
            context.res.body = fizzbuzz(possibleInt);
        }
        else {
            context.res = {
                status: 400,
                body: "Please pass a number in to the n query parameter"
            };
        }
    }
    else {
        context.res.body = fizzbuzz();
    }
};

function fizzbuzz (n = 100) {

    let lis = "";

    for(let i = 1; i <= n; i++) {
        lis += fizzbuzzN(i);
    }

    var ul = encloseInUnorderedListStyleNone(lis);

    return ul;
}

function encloseInHtmlElement(el, css = "") {
    return str => `<${el} ${css}>${str}</${el}>`;
}

const encloseInListItem = encloseInHtmlElement('li');

const encloseInUnorderedListStyleNone = encloseInHtmlElement('ul', "style = \"list-style-type:none;\"");

function fizzbuzzN(i) {

    var str = `${i} `;

    config.numWords.forEach(({num, word}) => {

        if (i%num === 0) {
            str += word;
        }
    });

    var li = encloseInListItem(str);

    return li;
}