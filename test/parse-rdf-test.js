'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const parseRDF = require('../lib/parse-rdf.js');

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);
describe('parseRDF', () => {
    it('should be a function', () => {
        expect(parseRDF).to.be.a('function');
    });

    it('should parse RDF content', () => {
        const book = parseRDF(rdf);
        expect(book).to.be.an('object');
        expect(book).to.have.a.property('id', 132);
        expect(book).to.have.a.property('title', 'The Art of War');
        expect(book).to.have.a.property('lcc').to.be.a('string');
        expect(book.lcc).to.not.be.empty;
        expect(book.lcc).to.match(/^[A-Z]/);
        expect(book.lcc).to.match(/^[^IOWXY]/);
        expect(book).to.have.a.property('authors').that.is.an('array').with.lengthOf(2)
        .an.contains('Sunzi, active 6th century B.C.')
        .an.contains('Giles, Lionel');
        expect(book).to.have.a.property('subjects')
            .that.is.an('array').with.lengthOf(2)
            .and.contains('Military art and science -- Early works to 1800')
            .and.contains('War -- Early works to 1800');
        expect(book).to.have.a.property('downloads').that.is.an('array').with.lengthOf(9);
        
        const download = book.downloads[0];
        expect(download).to.have.a.property('url', 'http://www.gutenberg.org/files/132/132.txt');
    });

});
