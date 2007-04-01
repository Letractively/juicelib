"""
Mapeia arquivos de mapeamento de SNPs para contigs
correspondentes
"""

import re
import sys

import os

def compact_lines(file):
	p = re.compile("\s+")
	for line in file:
		if not re.match("(\s*[/*])|(\s*$)", line):
			line = p.sub("", line)
			print line,
			
filename = sys.argv[1]
jsfile = file(filename)        
compact_lines(jsfile)