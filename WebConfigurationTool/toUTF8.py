#-*- coding: utf-8 -*-

import codecs
import os
import shutil
import re
import chardet

def convert_encoding(filename, target_encoding):

    # convert file from the source encoding to target encoding
    content = codecs.open(filename, 'r').read()
    source_encoding = chardet.detect(content)['encoding']
    print source_encoding, filename
    content = content.decode(source_encoding, 'ignore') #.encode(source_encoding)
    codecs.open(filename, 'w', encoding=target_encoding).write(content)

def main():
    for root, dirs, files in os.walk(os.getcwd()):
        for f in files:
            if f.lower().endswith('.h') | f.lower().endswith('.c') | f.lower().endswith('.cc') | f.lower().endswith('.cpp'):
                filename = os.path.join(root, f)
                try:
                    convert_encoding(filename, 'utf-8-sig')
                except Exception, e:
                    print filename

if __name__ == '__main__':
    main()
