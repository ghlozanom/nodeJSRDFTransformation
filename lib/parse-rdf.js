'use strict';
const cheerio = require('cheerio');

module.exports = rdf => {

    const $ = cheerio.load(rdf);
    const book = {};
    book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', '');
    book.title = $('dcterms\\:title').text();
    book.authors = $('pgterms\\:agent pgterms\\:name')
        .toArray().map(elem => $(elem).text());
    book.subjects = $('[rdf\\:resource$="/LCSH"]')
        .parent().find('rdf\\:value')
        .toArray().map(elem => $(elem).text());
    book.lcc = $('[rdf\\:resource$="/LCC"]')
        .parent().find('rdf\\:value').text();
    book.downloads = $('pgterms\\:file ')
        .toArray()
        .filter(elem => $(elem).attr('rdf:about').includes('132.rdf') == false)
        .map(elem => {
            return {
                url : $(elem).attr('rdf:about'),
                link2 : $(elem).find('rdf\\:value').toArray().map(child => $(child).text())
            };
        });
    return book;
};