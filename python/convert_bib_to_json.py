#!/usr/bin/python3

"""
A simple script to convert a single input BibLaTeX formatted .bib file
(as exported from Zotero) to a json dict that is used to create a .js
file (for use by the Catalogue in the VIEWpoint-cssp-portal).

Author: B Percy, IEA/UoR
Date: 20 Jan 2021
"""

import bibtexparser # https://bibtexparser.readthedocs.io/en/master/index.html
from bibtexparser.bparser import BibTexParser
#from bibtexparser.customization import homogenize_latex_encoding - didn't work!
import json

def cleanUp(bibString):
    '''
    Sadly, I can't find anything to get this parser to do this so
    this tries to remove known LaTeX markup from the passed string
    and returns the the cleaned up string as 'content' and a flag
    to show whether it appears
    '''
    if not bibString:
        return { 'content': null, 'html': false }

    # tidy up bibString by cleaning up the known types of LaTeX markup
    cleanContent = (
        bibString
        .replace('{\\textasciitilde}', '~') 
        .replace('{\\textbackslash}', '\\') 
        .replace('{\\textr', '')
        .replace('\\textit', '') 
        .replace('{', '')
        .replace('}', '')
    )
    # convert other known LaTeX markup to html
    # also replace newlines with breaks (although usually only in notes) and remove any tabs  
    htmlContent = (
        cleanContent 
        .replace('\\textless', '<') 
        .replace('\\textgreater', '>')
        .replace('\\n', '<br />')
        .replace('\\t', '')
    )
    return { 
        'content': htmlContent.replace('\\', ''),
        'html': not htmlContent == cleanContent or ('&' in htmlContent and ';' in htmlContent)
    }

# enddef clean

def make_json(bibFile, jsonFile): 
    '''
    Opens passed bibFile (which can have Chinese characters),
    parses it into a list/array of dicts/objects using bibtexparser
    and creates the resulting .js file defined by jsonFile

    To show prgoress, this prints the number of entries in the .bib file,
    each entry's ID and the number of elements in the final JSON 
    '''
      
    data = []
      
    with open(bibFile, encoding='utf-8-sig') as bibtex_file:
        
        parser = BibTexParser(common_strings=False)
        parser.ignore_nonstandard_types = False
        #parser.customization = homogenize_latex_encoding - didn't work!
        bib_database = bibtexparser.load(bibtex_file, parser=parser)
        print(len(bib_database.entries))

        actualType = {
            'article' : 'Journal Article',
            'book': 'Book',
            'incollection': 'Book Section',
            'inproceedings': 'Conference Paper',
            'online': 'Web Page'
        }
        
        for item in bib_database.entries: 
            print(item['ID'])
            entry = {}
            entry['id'] = item['ID']
            entry['type'] = item['ENTRYTYPE']
            if entry['type'] in actualType:
                entry['actualType'] = actualType[entry['type']]
            else:
                entry['actualType'] = entry['type']
            if 'title' in item:
                title = cleanUp(item['title'])
                entry['title'] = title['content']
            else:
                entry['title'] = None
            if 'date' in item:
                entry['year'] = item['date'].split('-')[0]
            else:
                entry['year'] = None
            if 'journaltitle' in item:
                journal = cleanUp(item['journaltitle'])
                entry['journal'] = journal['content']
            else:
                entry['journal'] = 'Unknown'
            if 'abstract' in item:
                abstract = cleanUp(item['abstract'])
                entry['abstract'] = abstract['content']
                entry['htmlAbstract'] = abstract['html']
            else:
                entry['abstract'] = None
                entry['htmlAbstract'] = False
            if 'author' in item:
                authors = cleanUp(item['author'])
                entry['authors'] = authors['content'].split(' and ')
            else:
                entry['authors'] = []
            if 'volume' in item:
                entry['volume'] = item['volume']
            else:
                entry['volume'] = None
            if 'number' in item:
                entry['issue'] = item['number']
            else:
                entry['issue'] = None
            if 'pages' in item:
                entry['pages'] = item['pages'].replace('--', '-')
            else:
                entry['pages'] = None
            if 'doi' in item:
                entry['doi'] = item['doi'].replace('https://doi.org/', '')
            else:
                entry['doi'] = None
            if 'issn' in item:
                entry['issn'] = item['issn']
            else:
                entry['issn'] = None
            if 'url' in item:
                entry['url'] = item['url']
            else:
                entry['url'] = None
            if 'keywords' in item:
                entry['keywords'] = item['keywords'].upper().replace('LONG-TERM', 'LONG TERM').split(', ')
            else:
                entry['keywords'] = []
            if 'publisher' in item:
                entry['publisher'] = item['publisher']
            else:
                entry['publisher'] = None
            if 'editor' in item:
                entry['editor'] = item['editor']
            else:
                entry['editor'] = None
            if 'note' in item:
                notes = cleanUp(item['note'])
                entry['notes'] = notes['content']
                entry['htmlNotes'] = notes['html']
            else:
                entry['notes'] = None
                entry['htmlNotes'] = False
            #print(entry)
            data.append(entry)
    print(len(data))
    
    with open(jsonFile, 'w', encoding='utf-8') as jsonf:
        jsonf.write('export const json = ')
        jsonf.write(json.dumps(data, indent=4, ensure_ascii=False))
          
# endDef make_json

if __name__ == '__main__':

    # filenames should include path if not in the same directory
    bibFile = r'VIEWpoint-jan2021-bibLaTeX.bib'
    #jsonFile = r'../src/js/VIEWpoint-json.js'
    jsonFile = r'VIEWpoint-json.js'
      
    make_json(bibFile, jsonFile)

# "We interrupt this program(me) to annoy you and make things generally more irritating!"
  
